import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserProfile from './components/UserProfile';
import Wallet from './components/Wallet';
import EditProfile from './components/EditProfile'
import Explore from './components/Explore';
import LandingPage from "./components/LandingPage";

import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Routes>
        <Route exact path='/userProfile' element={<UserProfile />} />
        <Route exact path='/wallet' element={<Wallet />} />
        <Route exact path='/userProfile/edit' element={<EditProfile />} />
        <Route exact path='/explore' element={<Explore />} />
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
