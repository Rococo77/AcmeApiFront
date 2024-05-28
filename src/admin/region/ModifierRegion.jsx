// src/components/ModifierRegion.jsx
import { useState, useEffect , useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';

const ModifierRegion = () => {
  const [region, setRegion] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  useEffect(() => {
    api.get(`/admin/regions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Utilisez le token d'AuthContext
      },
    })
    .then((response) => {
      setRegion(response.data); // Accédez directement à response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération de la région:', error);
    });
  }, [id, token]);
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await api.put(`/admin/regions/${id}`, region, {
        headers: {
          'Content-Type': 'application/json', // Assurez-vous que le type de contenu est correct
          'Authorization': `Bearer ${token}`
      }});
  
      // Avec axios, pas besoin de vérifier response.ok
      navigate('/admin/regions'); // Rediriger vers la liste des régions après la mise à jour
    }
    catch(error) {
      console.error('Failed to update the region:', error.response ? error.response.data : error);
    }
  };
  

  if (!region) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto mt-10 w-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Modifier la Région</h1>
      <form className="w-full max-w-lg mx-auto" onSubmit={handleUpdate}>
        {/* ... (les champs de formulaire avec les classes Tailwind) */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Mettre à jour la région
        </button>
      </form>
    </div>
  );
};

export default ModifierRegion;
