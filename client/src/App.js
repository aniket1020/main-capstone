import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import Wallet from "./components/Wallet";
import EditProfile from "./components/EditProfile";
import Explore from "./components/Explore";
import LandingPage from "./components/LandingPage";
import UploadNft from "./components/UploadNft";
import MyCollections from "./components/MyCollections";

import store from "./store";
import { Provider } from "react-redux";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { ethers } from "ethers";
import NFTAddress from "./contractsData/NFT-address.json";
import NFTAbi from "./contractsData/NFT.json";
import MarketplaceAddress from "./contractsData/Marketplace-address.json";
import MarketplaceAbi from "./contractsData/Marketplace.json";

function App() {
  let persistor = persistStore(store);

  const [nftInstance, setNftInstance] = useState(null);
  const [marketplaceInstance, setmarketplaceInstance] = useState(null);

  const loadContracts = async () => {

    // Initialize web3 provider and load smart contracts
    const provider = new ethers.providers.Web3Provider(
      window.ethereum
    );
    const signer = provider.getSigner();

    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );

    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);

    setNftInstance(nft);
    setmarketplaceInstance(marketplace);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Routes>
            <Route exact path="/userProfile" 
            element={<UserProfile 
                  nftInstance={nftInstance}
                  marketplaceInstance={marketplaceInstance}
                  loadContracts={loadContracts}
                />} 
            />
            <Route
              exact
              path="/wallet"
              element={<Wallet loadContracts={loadContracts} />}
            />
            <Route exact path="/userProfile/edit" element={<EditProfile />} />
            <Route
              exact
              path="/explore"
              element={
                <Explore
                  nftInstance={nftInstance}
                  marketplaceInstance={marketplaceInstance}
                  loadContracts={loadContracts}
                />
              }
            />
            <Route exact path="/" element={<LandingPage 
                              nftInstance={nftInstance}
                              marketplaceInstance={marketplaceInstance} 
                              loadContracts={loadContracts}
                            />} />
            <Route
              exact
              path="/upload"
              element={
                <UploadNft
                  nftInstance={nftInstance}
                  marketplaceInstance={marketplaceInstance}
                  loadContracts={loadContracts}
                />
              }
            />
            <Route
              exact
              path="/myCollections"
              element={
                <MyCollections
                  nftInstance={nftInstance}
                  marketplaceInstance={marketplaceInstance}
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
