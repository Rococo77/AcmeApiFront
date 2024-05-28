import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifierPlat = () => {
    const { id } = useParams();
    const [plat, setPlat] = useState(null);
    const [regions, setRegions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`http://192.168.1.120:8000/api/admin/recipes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setPlat(data));

        fetch("http://192.168.1.120:8000/api/admin/regions/", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setRegions(data));

        fetch("http://192.168.1.120:8000/api/admin/ingredients/", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setIngredients(data));
    }, [token, id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedPlat = {
            ...plat,
            region: { id: plat.region.id },
            ingredients: plat.ingredients.map((ingredient) => ({ id: ingredient.id })),
        };

        fetch(`http://192.168.1.120:8000/api/admin/recipes/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPlat),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                navigate("/admin/plats");
            })
            .catch((error) => {
                console.error("Failed to update the plat:", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlat((prevPlat) => ({
            ...prevPlat,
            [name]: value,
        }));
    };

    const handleIngredientsChange = (e) => {
        const { options } = e.target;
        const selectedIngredients = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedIngredients.push(options[i].value);
            }
        }
        setPlat((prevPlat) => ({
            ...prevPlat,
            ingredients: selectedIngredients.map((id) => ingredients.find((ingredient) => ingredient.id === parseInt(id))),
        }));
    };

    if (!plat) {
        return <div>Chargement des détails du plat...</div>;
    }

    return (
        <div className="container mx-auto mt-10 w-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Modifier le Plat</h1>
            <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nom">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="Nom"
                        name="Nom"
                        value={plat.Nom}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                {/* Repeat similar input blocks for other fields */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
                        Région
                    </label>
                    <select
                        id="region"
                        name="region"
                        value={plat.region.id}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Sélectionnez une région</option>
                        {regions.map((region) => (
                            <option key={region.id} value={region.id}>
                                {region.Nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
                        Ingrédients
                    </label>
                    <select
                        id="ingredients"
                        name="ingredients"
                        multiple
                        value={plat.ingredients.map((ingredient) => ingredient.id)}
                        onChange={handleIngredientsChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {ingredients.map((ingredient) => (
                            <option key={ingredient.id} value={ingredient.id}>
                                {ingredient.Nom}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Modifier le plat
                </button>
            </form>
        </div>
    );
};

export default ModifierPlat;
