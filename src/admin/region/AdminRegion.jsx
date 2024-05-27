// src/components/AdminRegion.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminRegion = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.1.31:8000/admin/regions/')
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des régions:', error);
        setLoading(false);
      });
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default AdminRegion;
