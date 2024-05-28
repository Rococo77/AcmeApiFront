import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import {AuthContext} from '../AuthContext';

const RegionDetails = () => {
  const [region, setRegion] = useState({});
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);

  
    useEffect(() => {
        const fetchRegionDetails = async () => {
          try {
            
            const response = await api.get(`/admin/regions/${id}`, {
              headers: {
                Authorization: `Bearer ${authToken}`, 
              },
            });
      
          
            setRegion(response.data);
          } catch (error) {
            console.error("Erreur lors de la récupération des détails de la région:", error);
          }
        };
      
        if (authToken) {
          fetchRegionDetails();
        }
      }, [id, authToken]);
      
      if (!region || Object.keys(region).length === 0) {
        return <div>Chargement...</div>;
      }    

return (
  <div className="mx-0 py-8 w-screen">
      <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{region.Nom}</h2>
          <p>{region.Description}</p>
          <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-700">Plats typiques :</h3>
              <ul>
                  {region.Plat && region.Plat.length > 0 ? (
                      region.Plat.map((plat) => (
                          <li key={plat.id} className="my-2">
                              {plat.Nom} - {plat.PrixUnit}€
                          </li>
                      ))
                  ) : (
                      <p>Aucun plat trouvé pour cette région.</p>
                  )}
              </ul>
          </div>
      </div>
  </div>
);
};

export default RegionDetails;
