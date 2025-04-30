import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import ZacetnaStran from "./components/ZacetnaStran";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Koncerti from "./components/Koncerti";
import Novice from "./components/novice";
import DrustvoOdeon from "./components/DrustvoOdeon";
import StranKoncerta from "./components/stranKoncerta";
import StranNovice from "./components/stranNovice";
import DodajKoncerte from "./components/dodajKoncerte";
import DodajNovice from "./components/dodajNovice";
import Onas from "./components/oNas";
import Admin from "./components/admin";
import PregledRezervacij from "./components/pregledRezervacij";
import PregledAbonentov from "./components/pregledAbonentov";
import PoskrolajNavrh from "./components/poskrolajNavrh";
import GlasbaMladih from "./components/glasbaMladih";
import PravilnikZasebnosti from "./components/pravilnikZasebnosti";
import SezonaLetnica from "./components/SezonaLetnica";
import StranGmSezone from "./components/StranGmSezone";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./components/Novice.css"
import Footer from "./components/footer";



function App() {


  return (
      <div className="App">
          <Router>
              <Navbar />
              <PoskrolajNavrh />
              <Routes>
                  <Route path="/" element={<ZacetnaStran />} />
                  <Route path="/koncerti" element={<Koncerti />} />
                  <Route path="/novice" element={<Novice />} />
                  <Route path="/drustvo-odeon" element={<DrustvoOdeon />} />
                  <Route path="/koncerti/:id" element={<StranKoncerta />} />
                  <Route path="/novice/:id" element={<StranNovice />} />
                  <Route path="/admin/dodaj-koncerte" element={<DodajKoncerte />} />
                  <Route path="/admin/dodaj-novice" element={<DodajNovice />} />
                  <Route path="/admin-dodajaj" element={<Admin />} />
                  <Route path="/admin/pregled-rezervacij" element={<PregledRezervacij />} />
                  <Route path="/admin/pregled-abonentov" element={<PregledAbonentov />} />
                  <Route path="/o-nas" element={<Onas />} />
                  <Route path="/glasba-mladih" element={<GlasbaMladih />} />
                  <Route path="/pravilnik-zasebnosti" element={<PravilnikZasebnosti />} />
                  <Route path="/sezona/:leto" element={<SezonaLetnica />} />
                  <Route path="/glasba-mladih/:leto" element={<StranGmSezone />} />
              </Routes>
              <Footer />
          </Router>
      </div>
  );
}

export default App;
