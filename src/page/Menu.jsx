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
        <div className="mx-4 py-8 w-full">
            <h2 className="text-3xl font-bold text-center mb-6">Nos plats à la carte</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.length === 0 ? (
                    <p className="text-center col-span-full">Aucune recette trouvée</p>
                ) : (
                    recipes.map((recipe) => (
                        <li key={recipe.id} className="border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300">
                            <Link to={`/recipes/${recipe.id}`}>
                                <h3 className="text-2xl font-semibold mb-2">{recipe.Nom}</h3>
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
