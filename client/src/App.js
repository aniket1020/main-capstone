import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserProfile from './components/UserProfile';
import Wallet from './components/Wallet';
import EditProfile from './components/EditProfile'
import Explore from './components/Explore';
import LandingPage from "./components/LandingPage";
import UploadNft from "./components/UploadNft";

import store from './store';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Routes>
            <Route exact path='/userProfile' element={<UserProfile />} />
            <Route exact path='/wallet' element={<Wallet />} />
            <Route exact path='/userProfile/edit' element={<EditProfile />} />
            <Route exact path='/explore' element={<Explore />} />
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path='/upload' element={<UploadNft />} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
