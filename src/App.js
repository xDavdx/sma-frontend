import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import ZacetnaStran from "./components/ZacetnaStran";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Koncerti from "./components/Koncerti";
import DrustvoOdeon from "./components/DrustvoOdeon";
import StranKoncerta from "./components/stranKoncerta";
import DodajKoncerte from "./components/dodajKoncerte";
import Onas from "./components/oNas";
import PoskrolajNavrh from "./components/poskrolajNavrh";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {


  return (
      <div className="App">
          <Router>
              <Navbar />
              <PoskrolajNavrh />
              <Routes>
                  <Route path="/" element={<ZacetnaStran />} />
                  <Route path="/koncerti" element={<Koncerti />} />
                  <Route path="/drustvo-odeon" element={<DrustvoOdeon />} />
                  <Route path="/koncerti/:id" element={<StranKoncerta />} />
                  <Route path="/koncerti/dodajadminmodule" element={<DodajKoncerte />} />
                  <Route path="/o-nas" element={<Onas />} />

              </Routes>
          </Router>
      </div>
  );
}

export default App;
