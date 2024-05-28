import { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import {AuthContext} from '../../AuthContext';
const AjouterPlat = () => {
  const [platData, setPlatData] = useState({
    nom: '',
    description: '',
    prix_unit: 0,
    stock_qtt: 0,
    allergen: '',
    region: '', // Remplacez par l'ID de la région appropriée
    ingredients: [] // Remplacez par les ingrédients appropriés
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlatData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const [ingredientsList, setIngredientsList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const {token} = useContext(AuthContext)

  useEffect(() => {
    // Récupérez la liste des ingrédients depuis l'API
    api.get('/admin/ingredients/', {
      headers: {
        Authorization: `Bearer ${token}`, // Utilisez le token d'AuthContext
      },
    })
      .then(response => {
       setIngredientsList(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des ingrédients:', error);
      });
    // Récupérez la liste des régions depuis l'API
    api.get('/admin/regions/', {
      headers: {
        Authorization: `Bearer ${token}`, // Utilisez le token d'AuthContext
      },
    })
      .then(response => {
        setRegionsList(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des régions:', error);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('admin/recipes/', platData, {

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        
      });

     
        console.log('Plat créé avec succès:', response.data);
        // Vous pouvez ajouter ici une redirection vers la liste des plats ou une confirmation d'ajout
      } catch (error) {
        console.error('Erreur lors de la création du plat:', error.response ? error.response.status : '', error.response ? error.response.data : error);
        // Gérez l'erreur (affichage d'un message d'erreur, etc.)
      }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Ajouter un Plat</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="nom" className="block font-medium">Nom du Plat</label>
          <input type="text" id="nom" name="nom" value={platData.nom} onChange={handleInputChange} className="w-full border rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea id="description" name="description" value={platData.description} onChange={handleInputChange} className="w-full border rounded-md p-2"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="prix_unit" className="block font-medium">Prix Unitaire</label>
          <input type="number" id="prix_unit" name="prix_unit" value={platData.prix_unit} onChange={handleInputChange} className="w-full border rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="stock_qtt" className="block font-medium">Quantité en Stock</label>
          <input type="number" id="stock_qtt" name="stock_qtt" value={platData.stock_qtt} onChange={handleInputChange} className="w-full border rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="allergen" className="block font-medium">Allergènes</label>
          <select multiple id="ingredients" name="ingredients" value={platData.ingredients} onChange={handleInputChange} className="w-full border rounded-md p-2">
            {ingredientsList.map(ingredient => (
              <option key={ingredient.id} value={ingredient.id}>{ingredient.nom}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="region" className="block font-medium">Région</label>
          <select id="region" name="region" value={platData.region} onChange={handleInputChange} className="w-full border rounded-md p-2">
            {regionsList.map(region => (
              <option key={region.id} value={region.id}>{region.nom}</option>
            ))}
          </select>
        </div>
       
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Ajouter
        </button>
      </form>
    </div>
  );
};
export default AjouterPlat;