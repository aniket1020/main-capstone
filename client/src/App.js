import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from './components/Home';

function App() {
  return (
    <div className="App">
      {/* Note : this is just a setup, please reconfigure */}
      Hello
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
