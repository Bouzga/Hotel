import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Home';
import Admin from './Components/Admin';
import APropos from './Components/APropos'; 
import SupprimerSlider from './Components/SupprimerSlider'
import UpdateSlider from'./Components/UpdateSlider'
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apropos" element={<APropos />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/supprimer-slider" element={<SupprimerSlider />} />
          <Route path="/update-slider" element={<UpdateSlider />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
