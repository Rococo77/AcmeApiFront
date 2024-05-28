// src/components/ModifierPlat.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';


const ModifierPlat = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prixUnit, setPrixUnit] = useState('');
  const [plat, setPlat] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  useEffect(() => {
    api.get(`/admin/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Utilisez le token d'AuthContext
      },
    })
    .then((response) => {
      setPlat(response.data); // Accédez directement à response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération du plat:', error);
    });
  }, [id, token]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const platModifie = {
      Nom: nom,
      Description: description,
      PrixUnit: prixUnit,
    };

    try {
      const response = await api.put(`/admin/recipes/${id}`, platModifie, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        navigate('/admin/plats');
      } else {
        throw new Error(`Erreur lors de la mise à jour du plat: ${response.status}`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du plat:', error);
    }
  };

  if (!plat) {
    return <div>Chargement...</div>;
  }
    

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Modifier le Plat</h1>
      <form onSubmit={handleUpdate} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom du plat:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prixUnit" className="block text-gray-700 text-sm font-bold mb-2">Prix unitaire:</label>
          <input
            type="number"
            id="prixUnit"
            value={prixUnit}
            onChange={(e) => setPrixUnit(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Mettre à jour le plat
        </button>
      </form>
    </div>
  );
};

export default ModifierPlat;
