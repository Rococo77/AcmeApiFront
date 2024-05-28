// src/components/ModifierPlat.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';


const ModifierPlat = () => {
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
    try {
      // Utilisez Axios pour envoyer une requête PUT
      const response = await api.put(`/admin/recipes/${id}`, plat, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluez le token d'authentification
        }
      });

      if (response.status === 200) { // Vérifiez si le statut est 200 (OK)
        navigate('/admin/plats'); // Rediriger vers la liste des plats après la mise à jour
      } else {
        throw new Error(`Erreur lors de la mise à jour du plat: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to update the plat:', error);
    }
  };

  if (!plat) {
    return <div>Chargement...</div>;
  }
    

  return (
    <div className="container mx-auto mt-10 w-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Modifier le Plat</h1>
      <form className="w-full max-w-lg mx-auto" onSubmit={handleUpdate}>
        {/* ... (les champs de formulaire avec les classes Tailwind) */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Mettre à jour le plat
        </button>
      </form>
    </div>
  );
};

export default ModifierPlat;
