import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { token, user } = useContext(AuthContext); // Assurez-vous que le token et l'utilisateur sont disponibles

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const apiUrl = `http://192.168.1.120:8000/api/admin/recipes/${id}`;
                const response = await fetch(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                setError(error.message);
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
            const response = await fetch(`http://192.168.1.120:8000/api/admin/panier/user/${user.id}/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: [
                        {
                            platId: id,
                            quantité: quantity,
                        },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add to cart: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Added to cart:", data);
        } catch (error) {
            console.error("Error adding to cart:", error);
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
                    {recipe.region && <p className="text-gray-700 mt-4">Region: {recipe.region.Nom}</p>}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
