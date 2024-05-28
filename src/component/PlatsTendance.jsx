// src/components/PlatsTendances.jsx
import  { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import {AuthContext} from '../AuthContext';

const PlatsTendances = () => {
  const [plats, setPlats] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    
    api.get('/admin/recipes/', {
      headers: {
        Authorization: `Bearer ${token}`, // Utilisez le token d'AuthContext
      },
    })
    .then((response) => {
      // Accédez directement à response.data
      const troisPremiersPlats = response.data.slice(0, 3);
      setPlats(troisPremiersPlats);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des plats:', error);
    });
  }, [token]);

  return (
    <div className="flex overflow-x-auto space-x-4  justify-center">
      {plats.map(plat => (
        <div key={plat.id} className="flex-shrink-0 mr-4">
          <img
            src={plat.imgURL}
            alt={plat.Nom}
            className="w-80 h-auto"
          />
          <p className="text-gray-700 text-center">{plat.Nom}</p>
        </div>
      ))}
    </div>
  );
};

export default PlatsTendances;
