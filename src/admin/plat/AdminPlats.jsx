import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';

const AdminPlats = () => {
  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(AuthContext)

  useEffect(() => {
   api.get('/admin/recipes/', {
      headers: {
        Authorization: `Bearer ${token}`, // Utilisez le token d'AuthContext
      },
    })
    .then((response) => {
      setPlats(response.data); // Accédez directement à response.data
      setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des plats:', error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Chargement des plats...</div>;
  }

  return (
    <div className="flex justify-center mt-10 w-screen">
      <div className="w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-center mb-6">Gestion des Plats</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Prix Unit
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock Qtt
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {plats.map((plat) => (
                <tr key={plat.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {plat.Nom}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {plat.PrixUnit}€
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {plat.StockQtt}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Link to={`/admin/plats/modifier/${plat.id}`} className="text-blue-600 hover:text-blue-900">
                      Modifier
                    </Link>
                    <Link to={`/admin/plats/supprimer/${plat.id}`} className="text-red-600 hover:text-red-900 ml-4">
                      Supprimer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/admin/plats/ajouter" className="text-green-600 hover:text-green-900 ml-4">
        Ajouter un plat
      </Link>
        </div>
      </div>
    </div>
  );
  
};

export default AdminPlats;
