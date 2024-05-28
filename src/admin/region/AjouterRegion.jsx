import  { useState, useContext } from 'react';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';

const AjouterRegion = () => {
  const [regionData, setRegionData] = useState({
    nom: '',
    description: ''
  });
  const {token} = useContext(AuthContext) 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegionData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/admin/regions/', regionData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      // Avec axios, pas besoin de vérifier response.ok
      console.log('Région créée avec succès:', response.data);
      // Vous pouvez ajouter ici une redirection vers la liste des régions ou une confirmation d'ajout
    } catch (error) {
      // Gérez les erreurs d'axios
      console.error('Erreur lors de la création de la région:', error.response ? error.response.status : '', error.response ? error.response.data : error);
      // Gérez l'erreur (affichage d'un message d'erreur, etc.)
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Ajouter une Région</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="nom" className="block font-medium">Nom de la Région</label>
          <input type="text" id="nom" name="nom" value={regionData.nom} onChange={handleInputChange} className="w-full border rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea id="description" name="description" value={regionData.description} onChange={handleInputChange} className="w-full border rounded-md p-2"></textarea>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Ajouter
        </button>
      </form>
    </div>
  );
};
export default AjouterRegion;