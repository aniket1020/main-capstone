import './App.css';
import { Routes, Route } from "react-router-dom";

import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/userProfile' element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
