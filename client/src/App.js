import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import Wallet from "./components/Wallet";
import EditProfile from "./components/EditProfile";
import Explore from "./components/Explore";
import LandingPage from "./components/LandingPage";
import UploadNft from "./components/UploadNft";

import { useState } from "react";

import store from './store';
import { Provider } from 'react-redux';

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { ethers } from "ethers";
import NFTAddress from "./contractsData/NFT-address.json";
import NFTAbi from "./contractsData/NFT.json";
import MarketplaceAddress from "./contractsData/NFT-address.json";
import MarketplaceAbi from "./contractsData/NFT.json";

import { ethers } from 'ethers';
import NFTAddress from './contractsData/NFT-address.json';
import NFTAbi from './contractsData/NFT.json';
import MarketplaceAddress from './contractsData/NFT-address.json';
import MarketplaceAbi from './contractsData/NFT.json';

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

  const [nftInstance, setNftInstance] = useState(null);
  const [marketplaceInstance, setmarketplaceInstance] = useState(null);

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    
    const nft = new ethers.Contract(
        NFTAddress.address, 
        NFTAbi.abi, signer
    );

    setNftInstance(nft);
    setmarketplaceInstance(marketplace);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Routes>
            <Route exact path='/userProfile' element={<UserProfile />} />
            <Route exact path='/wallet' element={<Wallet loadContracts={loadContracts} />}/>
            <Route exact path='/userProfile/edit' element={<EditProfile />} />
            <Route exact path='/explore' element={<Explore />} />
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path='/upload' element={<UploadNft nftInstance={nftInstance} marketplaceInstance={marketplaceInstance}/>} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
