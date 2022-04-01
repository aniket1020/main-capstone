import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile'
import Explore from './components/Explore';
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/userProfile' element={<UserProfile />} />
        <Route exact path='/userProfile/edit' element={<EditProfile />} />
        <Route exact path='/explore' element={<Explore />} />
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
