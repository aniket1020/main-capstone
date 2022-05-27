import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Card from "./Card";
import "./css/LandingPage.css";
import LandingImg from "./images/Landing-cover.png";
import MetamaskImg from "./images/metamask.jpeg";
import CoinbaseImg from "./images/coinbase.jpeg";
import BinanceImg from "./images/binance.png";
import cyberBrokersImg from "./images/cyberBrokers.svg";
import { WalletOutlined } from "@ant-design/icons";
import { PictureOutlined } from "@ant-design/icons";
import { DollarOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";

const LandingPage = ({ marketplace, nft }) => {

  // useEffect(() => {
  //   if(window)
  // });

  return (
    <div className="landing">
      <NavBar />
      <div className="landing-cover">
        <div className="landing-cover-left">
          <h1>Explore the Best</h1>
          <h1 id="alt-text">NFT World</h1>
          <p>Collect and Sell your Extraordinary Artwork.</p>
          <div className="landing-cover__buttons">
            <a id="alt-button" href="/">
              Explore
            </a>
            <a href="/">Upload</a>
          </div>
        </div>
        <div className="landing-cover-right">
          <img src={LandingImg} alt="Landing cover img not showing" />
        </div>
      </div>
      <div className="landing-wallets">
        <p>--Wallet</p>
        <h3>Wallets We Support</h3>
        <div className="landing-wallets__cards">
          <div className="wallets-indi">
            <img
              className="wallet-img"
              src={MetamaskImg}
              alt="Metamask img not available"
            />
            <p className="wallet-card__text">Metamask</p>
          </div>
          <div className="wallets-indi">
            <img
              className="wallet-img"
              src={CoinbaseImg}
              alt="Coinbase img not available"
            />
            <p className="wallet-card__text">Coinbase</p>
          </div>
          <div className="wallets-indi">
            <img
              className="wallet-img"
              src={BinanceImg}
              alt="Binance img not available"
            />
            <p className="wallet-card__text">Binance Wallet</p>
          </div>
        </div>
      </div>
      <div className="landing-auctions">
        <div className="landing-auctions__text">
          <p>--Live Auction</p>
          <h3>Trending Auctions</h3>
        </div>
        <div className="auction-cards">
          <Card
            src={cyberBrokersImg}
            tags={{ 0: "3D", 1: "ART", 2: "AUDIO" }}
            title="CyberBrokers"
            price={1.98}
            created="Nomad"
            owner="stoic"
            key={1234}
          />
          <Card
            src={cyberBrokersImg}
            tags={{ 0: "3D", 1: "ART", 2: "AUDIO" }}
            title="CyberBrokers"
            price={1.98}
            created="Nomad"
            owner="stoic"
            key={1235}
          />
          <Card
            src={cyberBrokersImg}
            tags={{ 0: "3D", 1: "ART", 2: "AUDIO" }}
            title="CyberBrokers"
            price={1.98}
            created="Nomad"
            owner="stoic"
            key={1236}
          />
          <Card
            src={cyberBrokersImg}
            tags={{ 0: "3D", 1: "ART", 2: "AUDIO" }}
            title="CyberBrokers"
            price={1.98}
            created="Nomad"
            owner="stoic"
            key={1237}
          />
        </div>
      </div>
      <div className="landing-trending">
        <p>--Trending</p>
        <h3>Trending NFT's</h3>
        <div className="trending-cards">
          <Card
            src={cyberBrokersImg}
            tags={{ 0: "3D", 1: "ART", 2: "AUDIO" }}
            title="CyberBrokers"
            price={1.98}
            created="Nomad"
            owner="stoic"
            key={1238}
          />
          <Card
            src={cyberBrokersImg}
            tags={{ 0: "3D", 1: "ART", 2: "AUDIO" }}
            title="CyberBrokers"
            price={1.98}
            created="Nomad"
            owner="stoic"
            key={1239}
          />
          <Card
            src={cyberBrokersImg}
            tags={{ 0: "3D", 1: "ART", 2: "AUDIO" }}
            title="CyberBrokers"
            price={1.98}
            created="Nomad"
            owner="stoic"
            key={1240}
          />
          <Card
            src={cyberBrokersImg}
            tags={{ 0: "3D", 1: "ART", 2: "AUDIO" }}
            title="CyberBrokers"
            price={1.98}
            created="Nomad"
            owner="stoic"
            key={1241}
          />
        </div>
      </div>
      <div className="landing-steps">
        <p>--Steps For Sell & Buy</p>
        <h3>Easy Steps to Create And Sell Your NFT</h3>
        <div className="steps-cards">
          <div className="steps-cards__indi">
            <WalletOutlined style={{ color: "#E27318", fontSize: "18px" }} />
            <h4>Setup Your Wallet</h4>
            <p>
              Once You've Setup Your Wallet of Choice, Connect it to OpenSea by
              Clicking the Wallet Icon in the Top Right Corner
            </p>
          </div>
          <div className="steps-cards__indi">
            <InboxOutlined style={{ color: "#E27318", fontSize: "18px" }} />
            <h4>Create Your Collection</h4>
            <p>
              Setup Your Collection. Add Social Links, a Description, Profile &
              Banner Images and Set a Secondary Sales Fee
            </p>
          </div>
          <div className="steps-cards__indi">
            <PictureOutlined style={{ color: "#E27318", fontSize: "18px" }} />
            <h4>Add Your NFT's</h4>
            <p>
              Upload Your Work. Add a Title and Description and Customize Your
              NFTs with Properties
            </p>
          </div>
          <div className="steps-cards__indi">
            <DollarOutlined style={{ color: "#E27318", fontSize: "18px" }} />
            <h4>List Them For Sale</h4>
            <p>
              Choose Between Auctions and Price Listings. You Choose How You
              Want to Sell Your NFTs & We Help You
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
