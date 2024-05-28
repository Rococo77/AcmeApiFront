import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import {AuthContext} from "../AuthContext";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { token, user } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchRecipe = async () => {
          try {
              // Utilisez axios pour envoyer une requête GET
              const response = await api.get(`/admin/recipes/${id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  },
              });

              // Pas besoin de vérifier response.ok avec axios, il gère les erreurs avec des exceptions
              setRecipe(response.data);
          } catch (error) {
              // Gérez les erreurs d'axios
              setError(`Échec de la récupération: ${error.response ? error.response.status : ''} ${error.message}`);
          } finally {
              setLoading(false);
          }
      };

      if (token) {
          fetchRecipe();
      }
  }, [id, token]);

  const addToCart = async () => {
      try {
          // Utilisez axios pour envoyer une requête POST
          const response = await api.post(`/admin/panier/user/${user.id}/`, {
              items: [
                  {
                      platId: id,
                      quantité: quantity,
                  },
              ],
          }, {
              headers: {
                  Authorization: `Bearer ${token}`
              },
          });

          // Pas besoin de vérifier response.ok avec axios, il gère les erreurs avec des exceptions
          console.log("Added to cart:", response.data);
      } catch (error) {
          // Gérez les erreurs d'axios
          console.error("Error adding to cart:", error.response ? error.response.data : error.message);
      }
  };

  if (loading) {
      return <div>Chargement...</div>;
  }

  if (error) {
      return <div>Erreur: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
        <div className="flex flex-col items-center">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.Nom}</h1>
                <img src={recipe.imgURL} alt={recipe.Nom} className="w-full h-64 object-cover mb-4 rounded" />
                <p className="text-gray-700 mb-2">{recipe.Description}</p>
                <span className="text-yellow-500 font-bold mt-4">Prix: {recipe.PrixUnit}€</span>
                <div className="mt-4 flex items-center">
                    <label htmlFor="quantity" className="mr-2">
                        Quantité:
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-20 p-2 border rounded-lg"
                        min="1"
                    />
                </div>
                <button onClick={addToCart} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Ajouter au panier
                </button>
                
            </div>
        </div>
    </div>
);
};

export default RecipeDetails;
