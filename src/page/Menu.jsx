import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
const Menu = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://192.168.1.31:8000/admin/recipes/'; // Replace with your API endpoint
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="mx-0 py-8 w-screen">
      <h2>Nos plats à la carte</h2>
      <ul className="grid grid-cols-3 gap-4"> {/* Grid layout for dishes */}
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border rounded-lg shadow-md p-4">
             <Link to={`/recipes/${recipe.id}`}>
            <h3>{recipe.Nom}</h3>
            <img src={recipe.imgURL} alt={recipe.Nom} className="w-full h-24 object-cover" />
            <span className="font-bold text-yellow-500">Prix: {recipe.PrixUnit}€</span>
          </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;