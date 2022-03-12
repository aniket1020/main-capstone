import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserProfile from "./components/UserProfile";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/userProfile" element={<UserProfile />} />
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
