import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
const Menu = () => {
    const [recipes, setRecipes] = useState([]);
    const { token } = useContext(AuthContext); // Utilisez le token d'authentification

    useEffect(() => {
        const apiUrl = "http://192.168.1.120:8000/api/admin/recipes/";

        const fetchRecipes = async () => {
            try {
                console.log(`Fetching from ${apiUrl}`);
                const response = await fetch(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données");
                }

                const data = await response.json();
                console.log("Données récupérées:", data);
                setRecipes(data);
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
                {recipes.length === 0 ? (
                    <p>Aucune recette trouvée</p>
                ) : (
                    recipes.map((recipe) => (
                        <li key={recipe.id} className="border rounded-lg shadow-md p-4">
                            <Link to={`/recipes/${recipe.id}`}>
                                <h3>{recipe.Nom}</h3>
                                <span className="font-bold text-yellow-500">Prix: {recipe.PrixUnit}€</span>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Menu;
