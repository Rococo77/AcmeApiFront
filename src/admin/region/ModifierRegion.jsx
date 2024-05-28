import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import api from '../../api/api';

const ModifierRegion = () => {
  const [nom, setNom] = useState(''); // Initialisé avec une chaîne vide
  const [description, setDescription] = useState(''); // Initialisé avec une chaîne vide
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/admin/regions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // Assurez-vous que les valeurs ne sont pas undefined
      setNom(response.data.nom || '');
      setDescription(response.data.description || '');
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération de la région:', error);
    });
  }, [id, token]);
  

  const handleUpdate = async (event) => {
    event.preventDefault();
    const regionModifiee = {
      nom,
      description,
    };

    try {
      const response = await api.put(`/admin/regions/${id}`, regionModifiee, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        navigate('/admin/regions');
      } else {
        throw new Error(`Erreur lors de la mise à jour de la région: ${response.status}`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la région:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Modifier la Région</h1>
      <form onSubmit={handleUpdate} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom de la région:</label>
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Mettre à jour la région
        </button>
      </form>
    </div>
  );
};

export default ModifierRegion;
