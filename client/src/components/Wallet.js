import React from "react";

import { ToastContainer, toast } from "react-toastify";

import "./css/Wallet.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "../features/userSlice";
import { setAccessToken } from "../features/accessTokenSlice";

import { ethers } from "ethers";

function Wallet({ loadContracts }) {
  const walletAddress = useSelector((state) =>
    state.user.value ? state.user.value.walletId : null
  );
  const dispatch = useDispatch();

  const handleMetamask = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          if (!walletAddress)
            axios
              .post(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}` +
                  "/connectWallet",
                {
                  walletId: result[0],
                }
              )
              .then((res) => {
                dispatch(setAccessToken(res.data.accessToken));
                dispatch(setUser(res.data.user));

                // Initialize web3 provider and load smart contracts
                const provider = new ethers.providers.Web3Provider(
                  window.ethereum
                );
                const signer = provider.getSigner();

                loadContracts(signer);
              })
              .catch((err) => console.log(err));

          toast.success("Metamask wallet connected successfully", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error connecting to wallet", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        });
    } else {
      console.log("Need to install MetaMask");
      toast.error("Please install MetaMask browser extension to interact", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white" }}
      />
      <div className="Wallet__Header">
        <div className="Wallet__Header__row1">
          | <br />
          Explore{/* #F18A24 */}
        </div>
        <div className="Wallet__Header__row2">Connect Your Wallet</div>
        <div className="Wallet__Header__row3">
          {" "}
          Home {">"} <span>Wallet</span>{" "}
        </div>
        <div className="walletSection">
          <div className="walletRow">
            <div className="wallet" onClick={() => handleMetamask()}>
              <img
                className="walletImage"
                src={require("./images/metamask.png")}
                alt=""
              ></img>
              <div className="walletName">Metamask</div>
            </div>
            <div className="wallet">
              <img
                className="walletImage"
                src={require("./images/coinbase.png")}
                alt=""
              ></img>
              <div className="walletName">Coinbase</div>
            </div>
            <div className="wallet">
              <img
                className="walletImage"
                src={require("./images/binance.png")}
                alt=""
              ></img>
              <div className="walletName">Binance</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wallet;
