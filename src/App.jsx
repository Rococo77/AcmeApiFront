import "./style.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/acceuil";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Menu from "./page/Menu";
import RecipeDetails from "./page/Platsdetails";
import RegionDetails from "./page/RegionDetails";

import AdminPlats from "./admin/plat/AdminPlats";
import ModifierPlat from "./admin/plat/ModifierPlat";
import SupprimerPlat from "./admin/plat/SupprimerPlat";
import AdminRegion from "./admin/region/AdminRegion";
import ModifierRegion from "./admin/region/ModifierRegion";
import SupprimerRegion from "./admin/region/SupprimerRegion";
import InscriptionForm from "./page/SignIn";
import LoginForm from "./page/Login";
import Panier from "./page/Panier";
import ContactPage from "./page/Contact";
import AjouterPlat from "./admin/plat/AjouterPlats";
import AjouterRegion from "./admin/region/AjouterRegion";
import { AuthProvider } from "./AuthContext"; // Assurez-vous que le chemin est correct
import ProtectedRoute from "./ProtectedRoute"; // Assurez-vous que le chemin est correct
import Profil from "./page/Profil";
function App() {
    return (
        <Router>
            <AuthProvider>
                <Header />
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signin" element={<InscriptionForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/panier" element={<Panier />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/menu/:id" element={<RegionDetails />} />
                        <Route path="/recipes/:id" element={<RecipeDetails />} />
                        <Route path="/profil" element={<Profil />} />
                        <Route path="/admin/plats" element={<AdminPlats />} />
                        <Route path="/admin/plats/ajouter" element={<AjouterPlat />} />
                        <Route path="/admin/plats/modifier/:id" element={<ModifierPlat />} />
                        <Route path="/admin/plats/supprimer/:id" element={<SupprimerPlat />} />
                        <Route path="/admin/regions" element={<AdminRegion />} />
                        <Route path="/admin/regions/ajouter" element={<AjouterRegion />} />
                        <Route path="/admin/regions/modifier/:id" element={<ModifierRegion />} />
                        <Route path="/admin/regions/supprimer/:id" element={<SupprimerRegion />} />
                    </Route>
                </Routes>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;
