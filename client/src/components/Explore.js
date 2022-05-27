import { useState, useEffect } from "react";
import "./css/Explore.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Card from "./Card";
import { SearchOutlined } from "@ant-design/icons";
import { ethers } from "ethers";

import { useSelector } from "react-redux";

function Explore({ nftInstance, marketplaceInstance }) {
  
  const walletAddress = useSelector((state) =>
    state.user.value ? state.user.value.walletId : null
  );

  const [visibleCards, setVisibleCards] = useState(4);
  const [items, setItems] = useState([]);

  const totalCardsSize = items.length;
  const [loadMoreVisible, setLoadMoreVisible] = useState(
    totalCardsSize <= 4 ? false : true
  );

  const loadMarketplaceItems = async () => {
    console.log("NFT instance", nftInstance);
    console.log("Marketplace instance", marketplaceInstance);
    const itemCount = await marketplaceInstance.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplaceInstance.items(i);
      if (!item.sold) {
        // get uri from nft contract
        const uri = await nftInstance.tokenURI(item.tokenId);

        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();

        // get total price of item ( item price + fee)
        const totalPrice = await marketplaceInstance.getTotalPrice(item.itemId);
        console.log(ethers.utils.formatEther(totalPrice));
        console.log(totalPrice);
        const totalPriceInETH = ethers.utils.formatEther(totalPrice);

        // Add item to items array
        items.push({
          totalPriceInETH,
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setItems(items);
  };

  const buyMarketplaceItem = async (item) => {
    await (
      await marketplaceInstance.purchaseItem(item.itemId, {
        value: item.totalPrice,
      })
    ).wait();
    loadMarketplaceItems();
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);
  const addUserCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);

    if (visibleCards >= totalCardsSize) {
      setLoadMoreVisible(false);
    }
  };

  const userCards = items.slice(0, visibleCards).map((item, idx) => (
    <div>
      {/* {console.log("-->XX",String(item.itemId))} */}
      <Card
        src={item.image} // For media src
        title={item.name} // NFTCard title
        // tags={cards[key].tags} // NFTCard tags no need
        price={item.totalPriceInETH} // NFTCard Price
        priceInBI={item.totalPrice}
        description={item.description}
        // walletAddress={item.seller}
        walletAddress={walletAddress}
        // created={cards[key].created} // Creator no need
        owner={item.seller} // Owner no need
        itemId={item.itemId} // Unique key Id
        nft={nftInstance}
        marketplace={marketplaceInstance}
      />
      {/* <p>{item.seller}</p> */}
    </div>
  ));
  return (
    <>
      <NavBar />

      <div className="Header">
        <div className="Header__row1">
          | <br />
          Explore{/* #F18A24 */}
        </div>
        <div className="Header__row2">Welcome To Explore</div>
        <div className="Header__row3">
          {" "}
          Home {">"} <span>Explore</span>{" "}
        </div>
      </div>

      <div className="searchbar">
        <div className="searchbox">
          <SearchOutlined />
          <input type="text" placeholder="Search Items..." />
        </div>
      </div>

      <div className="exploreItemSection">
        <div className="exploreItemCollection">
          {/* All Available Items */}
          {userCards}
        </div>
        <div className="loadMore">
          {loadMoreVisible ? (
            <div className="loadMoreButton" onClick={() => addUserCards()}>
              Load More
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Explore;
