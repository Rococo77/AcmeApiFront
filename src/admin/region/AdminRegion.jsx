// src/components/AdminRegion.jsx
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';

const AdminRegion = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(AuthContext);

  useEffect(() => {
    api.get('/admin/regions/', {
      headers: {
        Authorization: `Bearer ${token}`, // Utilisez le token d'AuthContext
      },
    })
    .then((response) => {
      setRegions(response.data); // Accédez directement à response.data
      setLoading(false);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des régions:', error);
      setLoading(false);
    });
  }, [token]);

  if (loading) {
    return <div>Chargement des régions...</div>;
  }

  return (
    <div className="flex justify-center mt-10 w-screen ">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-center mb-6">Gestion des Régions</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
            
                </th>
              </tr>
            </thead>
            <tbody>
              {regions.map((region) => (
                <tr key={region.id}>
                  
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {region.Nom}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {region.Description}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Link to={`/admin/regions/modifier/${region.id}`} className="text-blue-600 hover:text-blue-900">
                      Modifier
                    </Link>
                    <Link to={`/admin/regions/supprimer/${region.id}`} className="text-red-600 hover:text-red-900 ml-4">
                      Supprimer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/admin/regions/ajouter" className="text-green-600 hover:text-green-900 ml-4">
        Ajouter un region
      </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRegion;
