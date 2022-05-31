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
import {Row,Col} from 'react-bootstrap'
import { useSelector } from "react-redux";
import axios from "axios";
import { ethers } from "ethers";


function MyCollections({ nftInstance,marketplaceInstance }) {

  const walletAddress = useSelector((state) =>
    state.user.value ? state.user.value.walletId : null
  );


  // console.log("nft:", nft)
  // console.log("marketplace:", marketplace)
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter = marketplaceInstance.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      null,
      walletAddress
    );
    const results = await marketplaceInstance.queryFilter(filter);
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(
      results.map(async (i) => {
        // fetch arguments from each result
        i = i.args;
        // get uri url from nft contract
        const uri = await nftInstance.tokenURI(i.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplaceInstance.getTotalPrice(i.itemId);
        const totalPriceInETH = ethers.utils.formatEther(totalPrice);
        // const tipAmountInETH = ethers.utils.formatEther(i.tipAmount);
        // define listed item object
        let purchasedItem = {
          totalPriceInETH,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          tipAmount: i.tipAmount,
          description: metadata.description,
          image: metadata.image,
        };
        console.log(i.tipAmount);
        return purchasedItem;
      })
    );
    setLoading(false);
    setPurchases(purchases);
  };

  useEffect(async () => {
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
      loadPurchasedItems();
  }, []);

  if (isLoading) {
    return <div className="App">Loading...(Please connect wallet to view this page)</div>;
  }


 


  const userCards = purchases
    .map((item,idx) => (
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
                ? `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/`+user.profileBackgroundImagePath
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
          {/* {walletAddress === user.walletId ? (
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
          )} */}
        </div>
      </div>
      <div className="userCollectionFilter">
        <div className="userCollectionFilterOptions">
          <a className="userCollectionFilters">BOUGHT</a>
        </div>
      </div>
      <div className="userItemSection">
        <div className="userItemCollection">
          {/* User item collection */}
          {purchases.length == 0 ? (<div style={{ color: "gray", paddingTop: "40px" }}>
              {" "}
              😩 No NFTs to display
            </div>):(
              <>
              {userCards}
              
               
              </>
            )}


          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyCollections;
