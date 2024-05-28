import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AjouterPlat = () => {
    const [plat, setPlat] = useState({
        nom: "",
        description: "",
        prix_unit: "",
        stock_qtt: "",
        peremption_date: "",
        allergen: "",
        region: "",
        ingredients: [],
    });
    const [regions, setRegions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
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
    }, [token]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPlat = {
            ...plat,
            region: { id: plat.region },
            ingredients: plat.ingredients.map((id) => ({ id })),
        };

        console.log("Submitting plat:", newPlat); // Debug log

        fetch("http://192.168.1.120:8000/api/admin/recipes/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPlat),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Successfully created plat:", data); // Debug log
                navigate("/admin/plats");
            })
            .catch((error) => {
                console.error("Failed to create the plat:", error);
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
            ingredients: selectedIngredients,
        }));
    };

    return (
        <div className="container mx-auto mt-10 w-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Ajouter un Plat</h1>
            <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={plat.nom}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={plat.description}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prix_unit">
                        Prix Unitaire
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="prix_unit"
                        name="prix_unit"
                        value={plat.prix_unit}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock_qtt">
                        Quantité en Stock
                    </label>
                    <input
                        type="number"
                        id="stock_qtt"
                        name="stock_qtt"
                        value={plat.stock_qtt}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="peremption_date">
                        Date de Péremption
                    </label>
                    <input
                        type="date"
                        id="peremption_date"
                        name="peremption_date"
                        value={plat.peremption_date}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergen">
                        Allergène
                    </label>
                    <input
                        type="text"
                        id="allergen"
                        name="allergen"
                        value={plat.allergen}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
                        Région
                    </label>
                    <select
                        id="region"
                        name="region"
                        value={plat.region}
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
                        value={plat.ingredients}
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
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Ajouter le plat
                </button>
            </form>
        </div>
    );
};

export default AjouterPlat;
