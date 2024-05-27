import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const apiUrl = `http://192.168.1.31:8000/admin/recipes/${id}`; // Replace with your API endpoint
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setRecipe(data));
  }, [id]);


  const addToCart = () => {
    // Implement your logic to add the recipe to the cart here
    console.log('Added to cart:', recipe.Nom);
  };
  
  if (!recipe) {
    return <div>Chargement...</div>;
  }

   return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center">
        <div className='bg-white shadow-md rounded-lg p-4'>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.Nom}</h1>
          <img src={recipe.imgURL} alt={recipe.Nom} className="w-full h-64 object-cover mb-4 rounded" />
          <p className="text-gray-700 mb-2">{recipe.Description}</p>
          <span className="text-yellow-500 font-bold mt-4">Prix: {recipe.PrixUnit}€</span>
          <button
            onClick={addToCart}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
