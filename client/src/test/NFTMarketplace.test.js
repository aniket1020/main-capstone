const { expect } = require("chai");
// const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("NFTMarketplace", function () {
  let deployer, addr1, addr2, nft, marketplace;
  let feePercent = 1;
  let URI = "sample URI";
  beforeEach(async function () {
    // Get contract factories
    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");

    // Get signers
    [deployer, addr1, addr2] = await ethers.getSigners();

    // Deploy contracts
    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  });
  describe("Deployment", function () {
    it("Should track name and symbol of the nft collection", async function () {
      expect(await nft.name()).to.equal("DApp NFT");
      expect(await nft.symbol()).to.equal("DAPP");
    });
    it("Should track feeAccount and feePercent of the marketplace", async function () {
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(feePercent);
    });
  });
  describe("Minting NFTs", function () {
    it("Should track each minted NFT", async function () {
      // addr1 mints an nft
      await nft.connect(addr1).mint(URI);
      expect(await nft.tokenCount()).to.equal(1);
      expect(await nft.balanceOf(addr1.address)).to.equal(1);
      expect(await nft.tokenURI(1)).to.equal(URI);

      // addr2 mints an nft
      await nft.connect(addr2).mint(URI);
      expect(await nft.tokenCount()).to.equal(2);
      expect(await nft.balanceOf(addr2.address)).to.equal(1);
      expect(await nft.tokenURI(2)).to.equal(URI);
    });
  });
  describe("Making marketplace items", function () {
    beforeEach(async function () {
      // addr1 mints an nft
      await nft.connect(addr1).mint(URI);
      // addr1 approves marketplace to sell the nft
      await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
    });
    it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function () {
      // addr1 offers their nft at a price of 1 ether
      await expect(
        marketplace.connect(addr1).makeItem(nft.address, 1, toWei(1))
      )
        .to.emit(marketplace, "Offered")
        .withArgs(1, nft.address, 1, toWei(1), addr1.address);
      // Owner of the nft should now be the marketplace
      expect(await nft.ownerOf(1)).to.equal(marketplace.address);
      //Item count should now equal 1
      expect(await marketplace.itemCount()).to.equal(1);
      // Get item from items mapping then check fields to ensure they are correct
      const item = await marketplace.items(1);
      expect(item.itemId).to.equal(1);
      expect(item.nft).to.equal(nft.address);
      expect(item.tokenId).to.equal(1);
      expect(item.price).to.equal(toWei(1));
      expect(item.sold).to.equal(false);
    });
    it("Should fail if price is set to zero", async function () {
      await expect(
        marketplace.connect(addr1).makeItem(nft.address, 1, 0)
      ).to.be.revertedWith("Price must be greater than zero");
    });
  });
  describe("Purchasing marketplace items", function () {
    let price = 2;
    let totalPriceInWei;
    const fee = (feePercent / 100) * price;
    beforeEach(async function () {
      // addr1 mints an nft
      await nft.connect(addr1).mint(URI);
      // addr1 approves marketplace to sell the nft
      await nft.connect(addr1).setApprovalForAll(marketplace.address, true);
      // addr1 makes their nft a marketplace item
      await marketplace.connect(addr1).makeItem(nft.address, 1, toWei(price));
    });
    it("Should update item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event", async function () {
      const sellerInitialEthBal = await addr1.getBalance();
      const feeAccountInitialEthBal = await deployer.getBalance();
      // fetch items total price (market fees + item price)
      totalPriceInWei = await marketplace.getTotalPrice(1);
      // addr2 purchases item
      await expect(
        marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei })
      )
        .to.emit(marketplace, "Bought")
        .withArgs(
          1,
          nft.address,
          1,
          toWei(price),
          addr1.address,
          addr2.address
        );

      const sellerFinalEthBal = await addr1.getBalance();
      const feeAccountFinalEthBal = await deployer.getBalance();
      // Seller should recieve payment for the price of the NFT sold

      console.log("Seller Final Balance", fromWei(sellerFinalEthBal));
      console.log("Seller Initial Balance", fromWei(sellerInitialEthBal));
      console.log("Price", price);

      console.log("Fee Account Final Balance", fromWei(feeAccountFinalEthBal));
      console.log("Fee Initial Balance", fromWei(feeAccountInitialEthBal));
      console.log("Fee", fee);
      console.log(
        "Type of final",
        ethers.utils.parseEther(fromWei(feeAccountFinalEthBal))
      );
      console.log("Type of initial", typeof fromWei(feeAccountInitialEthBal));

      expect(+ethers.utils.parseEther(fromWei(feeAccountFinalEthBal))).to.equal(
        +fee + +ethers.utils.parseEther(fromWei(feeAccountInitialEthBal))
      );

      // feeAccount should receive fee

      expect(+fromWei(feeAccountFinalEthBal)).to.equal(
        +fromWei(feeAccountInitialEthBal) + +fee
      );
      // The buyer should now own the nft
      expect(await nft.ownerOf(1)).to.equal(addr2.address);
      //Item should be marked as sold
      expect((await marketplace.items(1)).sold).to.equal(true);
    });
    it("Should fail when invalid item ID is passed, item is already sold or insufficient ether is offered than required", async function () {
      // fails for invalid item IDs
      await expect(
        marketplace.connect(addr2).purchaseItem(2, { value: totalPriceInWei })
      ).to.be.revertedWith("item doesn't exist");

      await expect(
        marketplace.connect(addr2).purchaseItem(0, { value: totalPriceInWei })
      ).to.be.revertedWith("item doesn't exist");

      // Fails when insufficient ether is offered

      await expect(
        marketplace.connect(addr2).purchaseItem(1, { value: toWei(price) })
      ).to.be.revertedWith(
        "not enough ether to cover the total purchase value"
      );

      // addr2 purchases a nft
      await marketplace
        .connect(addr2)
        .purchaseItem(1, { value: totalPriceInWei });

      //deployer tries to purchase the same nft again
      await expect(
        marketplace
          .connect(deployer)
          .purchaseItem(1, { value: totalPriceInWei })
      ).to.be.revertedWith("item already sold");
    });
  });
});
