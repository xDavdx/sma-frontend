import logo from './logo.svg';
import './App.css';
import ZacetnaStran from "./components/ZacetnaStran";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Koncerti from "./components/Koncerti";
import DrustvoOdeon from "./components/DrustvoOdeon";
import StranKoncerta from "./components/stranKoncerta";


function App() {
  return (
      <div className="App">
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<ZacetnaStran />} />
                  <Route path="/koncerti" element={<Koncerti />} />
                  <Route path="/drustvo-odeon" element={<DrustvoOdeon />} />
                  <Route path="/koncerti/:id" element={<StranKoncerta />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
