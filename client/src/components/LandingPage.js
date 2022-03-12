import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Card from "./Card";
import "./css/LandingPage.css";
import LandingImg from "./images/Landing-cover.png";
import MetamaskImg from "./images/metamask.jpeg";
import CoinbaseImg from "./images/coinbase.jpeg";
import BinanceImg from "./images/binance.png";

const LandingPage = () => {
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
        <p>--Live Auction</p>
        <h3>Trending Auctions</h3>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
