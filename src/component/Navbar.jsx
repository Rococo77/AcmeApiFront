import  { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import {AuthContext} from "../AuthContext";
const Navbar = () => {
  const [regions, setRegions] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchRegions = async () => {
      if (token) {
        try {
          // Utilisez Axios pour obtenir les données
          const response = await api.get('/admin/regions/', {
            headers: {
              Authorization: `Bearer ${token}`, // Ajoutez le token d'authentification
            },
          });

          // Pas besoin de convertir la réponse en JSON, Axios le fait automatiquement
          console.log("Données récupérées:", response.data); // Débogage : Afficher les données récupérées
          setRegions(response.data);
        } catch (error) {
          console.error("Erreur de Axios:", error);
        }
      }
    };
    fetchRegions();
}, [token]);

return (
  <nav className="bg-red-600 text-white py-4 ">
    <div className="container mx-auto flex  justify-between items-center">
      <ul className="flex  justify-center flex-grow">
        <li className="mx-4">
          <Link to="/">Accueil</Link>
        </li>
        <li className="mx-4">
          <Link to="/menu">Toutes les régions</Link>
        </li>
        <li className="mx-4">
          {regions.length > 0 ? (
            <ul className="flex flex-row">
              {regions.map((region) => (
                <li key={region.id} className="mx-2">
                  <Link to={`/menu/${region.id}`}>{region.Nom}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Chargement des régions...</p>
          )}
        </li>
        
        <li className="mx-4">
          <Link to="/contact">Contact</Link>
        </li>
        
        <li className="mx-4">
          <Link to="/admin/plats">AdminPlat</Link>
        </li>
        <li className="pr-5">
          <Link to="/admin/regions">AdminReg</Link>
        </li>
       
      </ul>
      <ul className='flex '>
      <li className="mr-2">
          <Link to="/login">
            {/* Icône de connexion */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6">
              <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
            </svg>
          </Link>
      </li>
      <li className="mr-2">
          <Link to="/panier">
            {/* Icône du panier */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-6">
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>
          </Link>
      </li>  
      <li className="mr-0">
          <Link to="/profil">
            {/* Icône du profil */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6">
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

};

export default Navbar;
