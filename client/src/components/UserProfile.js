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

import { useSelector } from "react-redux";
import axios from "axios";

// Temp JSON object for NFT cards
const cards = {
  0: {
    src: "https://miro.medium.com/max/300/1*EZ3xJIkmeVtcdeolOav4PQ.gif",
    title: "NFT Monkeys",
    // tags: { 0: "3D", 1: "ART", 2: "AUDIO" },
    price: 4,
    // created: "sanya",
    owner: "vijaypatil",
  },
};

function UserProfile({ marketplace, nft, account }) {
  const walletAddress = useSelector((state) =>
    state.user.value ? state.user.value.walletId : null
  );

  const [visibleCards, setVisibleCards] = useState(4);
  const totalCardsSize = Object.keys(cards).length;
  const isCardsListEmpty = totalCardsSize === 0 ? true : false;
  const [loadMoreVisible, setLoadMoreVisible] = useState(
    totalCardsSize <= 4 ? false : true
  );

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  const addUserCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);

    if (visibleCards >= totalCardsSize) {
      setLoadMoreVisible(false);
    }
  };

  const userCards = Object.keys(cards)
    .slice(0, visibleCards)
    .map((key) => (
      <Card
        src={cards[key].src} // For media src
        title={cards[key].title} // NFTCard title
        // tags={cards[key].tags} // NFTCard tags
        price={cards[key].price} // NFTCard Price
        // created={cards[key].created} // Creator
        owner={cards[key].owner} // Owner
        key={key} // Unique key Id
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
          <a className="userCollectionFilters">Owned</a>
          <a className="userCollectionFilters">Created</a>
          <a className="userCollectionFilters">Artwork</a>
          <a className="userCollectionFilters">Liked</a>
          <a className="userCollectionFilters">History</a>
        </div>
      </div>
      <div className="userItemSection">
        <div className="userItemCollection">
          {/* User item collection */}
          {isCardsListEmpty ? (
            <div style={{ color: "gray", paddingTop: "40px" }}>
              {" "}
              😩 No NFTs available
            </div>
          ) : (
            userCards
          )}
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

export default UserProfile;
