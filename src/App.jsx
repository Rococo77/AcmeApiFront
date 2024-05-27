
import './style.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './page/acceuil'
import Header from './component/Header'
import Footer from './component/Footer'
import Navbar from './component/Navbar'
import Menu from './page/Menu'
import RecipeDetails from './page/Platsdetails'
import RegionDetails from './page/RegionDetails'

import AdminPlats from './admin/plat/AdminPlats'
import ModifierPlat from './admin/plat/ModifierPlat'
import SupprimerPlat from './admin/plat/SupprimerPlat'
import AdminRegion from './admin/region/AdminRegion'
import ModifierRegion from './admin/region/ModifierRegion'
import SupprimerRegion from './admin/region/SupprimerRegion'
function App() {
  
  return (
    <Router className='container '>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<RegionDetails/>} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/admin/plats" element={<AdminPlats />} />
          <Route path="/admin/plats/modifier/:id" element={<ModifierPlat />} />
          <Route path="/admin/plats/supprimer/:id" element={<SupprimerPlat />} />
          <Route path="/admin/regions" element={<AdminRegion />} />
          <Route path="/admin/regions/modifier/:id" element={<ModifierRegion />} />
          <Route path="/admin/regions/supprimer/:id" element={<SupprimerRegion/>} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App
