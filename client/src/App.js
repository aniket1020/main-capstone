import './App.css';
import { Routes, Route } from "react-router-dom";

import UserProfile from './components/UserProfile';
import Explore from './components/Explore';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/userProfile' element={<UserProfile />} />
        <Route exact path='/explore' element={<Explore />} />
      </Routes>
        
    </div>
  );
}

export default App;
