// Sold render
//create new page for my collections

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/UserProfile.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Card from "./Card";

import Image from "react-bootstrap/Image";
import { CopyOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from 'react-bootstrap'
import { useSelector } from "react-redux";
import axios from "axios";
import { ethers } from "ethers";


function UserProfile({ nftInstance, marketplaceInstance, loadContracts }) {
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])
  const walletAddress = useSelector((state) =>
    state.user.value ? state.user.value.walletId : null
  );

  // const [visibleCards, setVisibleCards] = useState(4);
  // const totalCardsSize = Object.keys(cards).length;
  // let totalCardsSize ;
  // const isCardsListEmpty = totalCardsSize === 0 ? true : false;
  // const [loadMoreVisible, setLoadMoreVisible] = useState(
  //   totalCardsSize <= 4 ? false : true
  // );

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const loadListedItems = async () => {
    if (walletAddress) {
      // Load all sold items that the user listed
      const itemCount = await marketplaceInstance.itemCount()
      let listedItems = []
      let soldItems = []
      for (let indx = 1; indx <= itemCount; indx++) {
        const i = await marketplaceInstance.items(indx)
        if (i.seller.toLowerCase() === walletAddress) {
          // get uri url from nft contract
          const uri = await nftInstance.tokenURI(i.tokenId)
          // use uri to fetch the nft metadata stored on ipfs 
          const response = await fetch(uri)
          const metadata = await response.json()
          // get total price of item (item price + fee)
          const totalPrice = await marketplaceInstance.getTotalPrice(i.itemId)
          const totalPriceInETH = ethers.utils.formatEther(totalPrice);
          // define listed item object
          let item = {
            totalPriceInETH,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            tipAmount:i.tipAmount,
            description: metadata.description,
            image: metadata.image
          }
          listedItems.push(item)
          // Add listed item to sold items array if sold
          if (i.sold) soldItems.push(item)
        }
      }
      setListedItems(listedItems)
      setSoldItems(soldItems)
    }
  }




  useEffect(async () => {
    if (nftInstance == null && marketplaceInstance == null) {
      loadContracts();
    }
    await axios
      .get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` + "/userProfile/getUser", {
        params: {
          walletId: walletAddress,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      });
    loadListedItems();
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }



  // useEffect(() => {
  //   loadListedItems()
  // }, [])

  // const addUserCards = () => {
  //   setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);

  //   if (visibleCards >= totalCardsSize) {
  //     setLoadMoreVisible(false);
  //   }
  // };

  const userCards = listedItems
    .map((item, idx) => (
      <Card
        src={item.image} // For media src
        title={item.name} // NFTCard title
        // tags={cards[key].tags} // NFTCard tags no need
        price={item.totalPriceInETH} // NFTCard Price
        priceInBI={item.totalPrice}
        description={item.description}
        tipAmount={ethers.utils.formatEther(item.tipAmount)}
        // walletAddress={item.seller}
        walletAddress={walletAddress}
        // created={cards[key].created} // Creator no need
        owner={walletAddress} // Owner no need
        itemId={item.itemId} // Unique key Id
        nft={nftInstance}
        marketplace={marketplaceInstance}
      />
    ));

  const soldCards = soldItems.map((item, idx) => (
    <Card
      src={item.image} // For media src
      title={item.name} // NFTCard title
      // tags={cards[key].tags} // NFTCard tags no need
      price={item.totalPriceInETH} // NFTCard Price
      priceInBI={item.totalPrice}
      description={item.description}
      tipAmount={ethers.utils.formatEther(item.tipAmount)}
      // walletAddress={item.seller}
      walletAddress={walletAddress}
      // created={cards[key].created} // Creator no need
      owner={walletAddress} // Owner no need
      itemId={item.itemId} // Unique key Id
      nft={nftInstance}
      marketplace={marketplaceInstance}
    />
  ));

  return (
    <>
      <NavBar />
      {/* Only the profile background */}
      <div className="profileBackground">
        <img
          className="profileBackgroundImage"
          src={
            user
              ? user.profileBackgroundImagePath
                ? `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/` + user.profileBackgroundImagePath
                : require("./images/backgroundUserProfileImage.jpeg")
              : require("./images/backgroundUserProfileImage.jpeg")
          }
          alt="no image"
        />
      </div>
      {/* Profile user settings */}
      <div className="profileId">
        <div className="profileCard">
          <Image
            className="profileImage"
            roundedCircle
            height={160}
            width={160}
            src={
              user
                ? user.profileImagePath
                  ? `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/` + user.profileImagePath
                  : require("./images/profileDefault.png")
                : require("./images/profileDefault.png")
            }
            alt="no image"
          />
          <div className="profileName">
            <strong>
              {user ? (
                user.firstName ? (
                  user.firstName + " " + user.lastName
                ) : (
                  <i>No Name Set</i>
                )
              ) : (
                <i>No Name Set</i>
              )}
            </strong>
          </div>
          <div className="profileUserName">
            {user ? (
              user.userName ? (
                "@" + user.userName
              ) : (
                <i>No Username Set</i>
              )
            ) : (
              <i>No Username Set</i>
            )}
          </div>
        </div>
        <div className="profileUserSettings">
          <div className="walletAddress">
            {user ? user.walletId : <i>No wallet address</i>}
          </div>
          <div className="id-copy">
            <CopyOutlined
              onClick={() => {
                if (user.walletId) {
                  navigator.clipboard.writeText(String(user.walletId));
                  toast.success("Copied to clipboard successfully", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                  });
                } else {
                  toast.error("Failed to copy to clipboard", {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                  });
                }
              }}
            />
            <ToastContainer
              toastStyle={{ backgroundColor: "black", color: "white" }}
            />
          </div>
          {walletAddress === user.walletId ? (
            <>
              <div
                className="id-btn editProfileBtn"
                onClick={() => navigate("/userProfile/edit")}
              >
                <EditOutlined style={{ fontSize: "16.5px" }} />
                &nbsp; Edit Profile
              </div>
              <div
                className="id-btn settingsBtn"
                onClick={() => navigate("/userProfile/edit")}
              >
                <SettingOutlined style={{ fontSize: "16.5px" }} />
                &nbsp; Settings
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="userCollectionFilter">
        <div className="userCollectionFilterOptions">
          <a className="userCollectionFilters">CREATED</a>
          {/* <a className="userCollectionFilters">Created</a>
          <a className="userCollectionFilters">Artwork</a>
          <a className="userCollectionFilters">Liked</a>
          <a className="userCollectionFilters">History</a> */}
        </div>
      </div>
      <div className="userItemSection">
        <div className="userItemCollection">
          {/* User item collection */}
          {/* {isCardsListEmpty ? (
            <div style={{ color: "gray", paddingTop: "40px" }}>
              {" "}
              😩 No NFTs available
            </div>
          ) : (
            userCards
          )} */}


          {listedItems.length == 0 ? (<div style={{ color: "gray", paddingTop: "40px" }}>
            {" "}
            😩 No NFTs to display
          </div>) : (
            <>
              {userCards}


            </>
          )}
        </div>
      </div>
      <div className="userCollectionFilter">
        <div className="userCollectionFilterOptions">
          <a className="userCollectionFilters">SOLD</a>
        </div>
      </div>
      <div className="userItemSection">
        <div className="userItemCollection">
          {soldItems.length == 0 ? (<div style={{ color: "gray", paddingTop: "40px" }}>
            {" "}
            😩 No NFTs to display
          </div>) : (
            <>
              {soldCards}


            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
