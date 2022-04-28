import './App.css';
import { Routes, Route } from "react-router-dom";

import UserProfile from './components/UserProfile';
import Wallet from './components/Wallet';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/userProfile' element={<UserProfile />} />
        <Route exact path='/wallet' element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;
