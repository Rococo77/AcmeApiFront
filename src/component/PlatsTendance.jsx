// src/components/PlatsTendances.jsx
import  { useState, useEffect } from 'react';

const PlatsTendances = () => {
  const [plats, setPlats] = useState([]);

  useEffect(() => {
    // Remplacez l'URL par votre point de terminaison API pour les plats
    const apiUrl = 'http://192.168.1.31:8000/admin/recipes/';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Récupérez les trois premiers plats
        const troisPremiersPlats = data.slice(0,3);
        setPlats(troisPremiersPlats);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }, []);

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
