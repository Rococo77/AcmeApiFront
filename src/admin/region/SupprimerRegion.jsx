
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';

const SupprimerRegion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      // Utilisez Axios pour envoyer une requête DELETE
      const response = await api.delete(`/admin/regions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Incluez le token d'authentification
        }
      });

      if (response.status === 200) { // Vérifiez si le statut est 200 (OK)
        navigate('/admin/regions'); // Rediriger vers la liste des plats après la suppression
      } else {
        throw new Error(`Erreur lors de la suppression du region: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete the region:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Supprimer la Région</h1>
      <div className="text-center">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
          Supprimer la région
        </button>
      </div>
    </div>
  );
};

export default SupprimerRegion;
