import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AjouterIngredient = () => {
    const [ingredient, setIngredient] = useState({ Nom: "" });
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Récupère le token depuis le stockage local

    const handleSubmit = (event) => {
        event.preventDefault();
        // Préparer le JSON pour l'envoi
        const newIngredient = {
            Nom: ingredient.Nom,
        };

        fetch("http://192.168.1.120:8000/api/admin/ingredients/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newIngredient),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Rediriger vers la liste des ingrédients après la création
                navigate("/admin/ingredients");
            })
            .catch((error) => {
                console.error("Failed to create the ingredient:", error);
            });
    };

    return (
        <div className="container mx-auto mt-10 w-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Ajouter un Ingrédient</h1>
            <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nom">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="Nom"
                        value={ingredient.Nom}
                        onChange={(e) => setIngredient({ ...ingredient, Nom: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Ajouter l'ingrédient
                </button>
            </form>
        </div>
    );
};

export default AjouterIngredient;
