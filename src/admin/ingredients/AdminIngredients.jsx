import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminIngredient = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token"); // Récupère le token depuis le stockage local (ou une autre méthode que vous utilisez)
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://192.168.1.120:8000/api/admin/ingredients/", {
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setIngredients(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des ingrédients:", error);
                setLoading(false);
            });
    }, [token]);

    const handleDelete = (id) => {
        fetch(`http://192.168.1.120:8000/api/admin/ingredients/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // Met à jour l'état local pour refléter la suppression
                setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
            })
            .catch((error) => {
                console.error("Failed to delete the ingredient:", error);
            });
    };

    if (loading) {
        return <div>Chargement des ingrédients...</div>;
    }

    return (
        <div className="flex justify-center mt-10 w-screen">
            <div className="w-full max-w-6xl">
                <h1 className="text-2xl font-bold text-center mb-6">Gestion des Ingrédients</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nom
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((ingredient) => (
                                <tr key={ingredient.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{ingredient.Nom}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <Link to={`/admin/ingredients/modifier/${ingredient.id}`} className="text-blue-600 hover:text-blue-900">
                                            Modifier
                                        </Link>
                                        <button onClick={() => handleDelete(ingredient.id)} className="text-red-600 hover:text-red-900 ml-4">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/admin/ingredients/ajouter" className="text-green-600 hover:text-green-900 ml-4">
                        Ajouter un ingrédient
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminIngredient;
