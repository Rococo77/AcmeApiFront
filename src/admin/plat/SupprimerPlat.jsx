import { useParams, useNavigate  } from 'react-router-dom';
import { useContext } from 'react';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';

const SupprimerPlat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);


  const handleDelete = async () => {
    try {
      // Utilisez Axios pour envoyer une requête DELETE
      const response = await api.delete(`/admin/recipes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Incluez le token d'authentification
        }
      });

      if (response.status === 200) { // Vérifiez si le statut est 200 (OK)
        navigate('/admin/plats'); // Rediriger vers la liste des plats après la suppression
      } else {
        throw new Error(`Erreur lors de la suppression du plat: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete the plat:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 w-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Supprimer le Plat</h1>
      <div className="text-center">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
          Supprimer le plat
        </button>
      </div>
    </div>
  );
};

export default SupprimerPlat;
