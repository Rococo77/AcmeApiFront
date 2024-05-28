import { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom'
import api from '../api/api';
import {AuthContext} from "../AuthContext";
const Menu = () => {
  const [recipes, setRecipes] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipes = async () => {
        try {
            const response = await api.get("/admin/recipes/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Données récupérées:", response.data);
            setRecipes(response.data);
        } catch (error) {
            console.error("Erreur de fetch:", error);
        }
    };
  

    if (token) {
        fetchRecipes();
    }
}, [token]);

  return (
    <div className="mx-0 py-8 w-screen">
      <h2>Nos plats à la carte</h2>
      <ul className="grid grid-cols-3 gap-4"> 
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