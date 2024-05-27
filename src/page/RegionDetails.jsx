import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RegionDetails = () => {
  const [region, setRegion] = useState({});
  const [plats, setPlats] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Récupération des détails de la région
    const regionUrl = `http://192.168.1.31:8000/admin/regions/${id}`;
    fetch(regionUrl)
      .then((response) => response.json())
      .then((data) => setRegion(data));

    // Récupération de tous les plats
    const platsUrl = `http://192.168.1.31:8000/admin/recipes`;
    fetch(platsUrl)
      .then((response) => response.json())
      .then((data) => {
        // Filtrer pour ne garder que les plats de la région actuelle
        const platsDeLaRegion = data.filter((plat) => plat.region && (plat.region.id === parseInt(id) || plat.region.Nom === region.Nom));
        setPlats(platsDeLaRegion);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des plats :", error);
      });
  }, [id, region.Nom]);

  if (!region) {
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
            {plats.length > 0 ? (
              plats.map((plat) => (
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
