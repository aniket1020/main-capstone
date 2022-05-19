import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import Wallet from "./components/Wallet";
import EditProfile from "./components/EditProfile";
import Explore from "./components/Explore";
import LandingPage from "./components/LandingPage";
import UploadNft from "./components/UploadNft";

import store from "./store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { ethers } from "ethers";
import NFTAddress from "./contractsData/NFT-address.json";
import NFTAbi from "./contractsData/NFT.json";
import MarketplaceAddress from "./contractsData/NFT-address.json";
import MarketplaceAbi from "./contractsData/NFT.json";

function App() {
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  // MetaMask Login/Connect
  const web3Handler = async () => {
    console.log("Inside web3handler function!!!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    console.log("nfttyuiop: ", nft);
    setNFT(nft);
  };

  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Routes>
            <Route
              path="/userProfile"
              element={
                <UserProfile
                  marketplace={marketplace}
                  nft={nft}
                  account={account}
                />
              }
            />
            <Route
              path="/wallet"
              element={<Wallet web3Handler={web3Handler} />}
            />
            <Route path="/userProfile/edit" element={<EditProfile />} />
            <Route
              exact
              path="/explore"
              element={<Explore marketplace={marketplace} nft={nft} />}
            />
            <Route
              exact
              path="/"
              element={<LandingPage marketplace={marketplace} nft={nft} />}
            />
            <Route
              path="/upload"
              element={
                <UploadNft
                  marketplace={marketplace}
                  nft={nft}
                  account={account}
                />
              }
            />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
