import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://192.168.1.31:8000/admin/regions/';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setRegions(data));
  }, []);

  return (
    <nav className="bg-red-600 text-white py-4 justify-center">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <ul className="flex flex-row justify-center w-screen">
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
          <Link to="/cart">Panier</Link>
          </li>
          <li className='mx-4'>
          <Link to="/contact">Contact</Link>
          </li>
          <li className='mx-4'>
          <Link to="/profil">Profil</Link>
          </li>
          <li className='mx-4'>
          <Link to="/admin/plats">AdminPlat</Link>
          </li>
          <li className='mx-4'>
            <Link to="/admin/regions">AdminReg</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
