// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    // State variables
    address payable public immutable feeAccount; // the account that receives the fees
    uint256 public immutable feePercent; //the fee percentage on sales
    uint256 public itemCount;

    struct Item {
        uint256 itemId;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        uint256 tipAmount;
        address payable seller;
        bool sold;
    }

    event Offered(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        address indexed seller
    );

    event Bought(
        uint256 itemId,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        uint256 tipAmount,
        address indexed seller,
        address indexed buyer
    );

    event Tipped(uint256 id, uint256 tipAmount, address payable seller);

    // itemId -> Item
    mapping(uint256 => Item) public items;

    constructor(uint256 _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(
        IERC721 _nft,
        uint256 _tokenId,
        uint256 _price
    ) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount++;
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            0,
            payable(msg.sender),
            false
        );
        //emit Offered event
        emit Offered(itemCount, address(_nft), _tokenId, _price, msg.sender);
    }

    function purchaseItem(uint256 _itemId) external payable nonReentrant {
        uint256 _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(
            msg.value >= _totalPrice,
            "not enough ether to cover the total purchase value"
        );
        require(!item.sold, "item already sold");
        // pay seller and feeAccount
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.tipAmount,
            item.seller,
            msg.sender
        );
    }

    function tipPostOwner(uint256 _id) external payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= itemCount, "Invalid post id");
        // Fetch the item
        Item memory _item = items[_id];
        require(_item.seller != msg.sender, "Cannot tip your own post");
        // Pay the seller by sending them Ether
        _item.seller.transfer(msg.value);
        // Increment the tip amount
        _item.tipAmount += msg.value;
        // Update the image
        items[_id] = _item;
        // Trigger an event
        emit Tipped(_id, _item.tipAmount, _item.seller);
    }

    function getTotalPrice(uint256 _itemId) public view returns (uint256) {
        return ((items[_itemId].price * (100 + feePercent)) / 100);
    }
}
