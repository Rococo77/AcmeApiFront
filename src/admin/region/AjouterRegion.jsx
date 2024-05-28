import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AjouterRegion = () => {
    const [region, setRegion] = useState({ Nom: "" });
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Récupère le token depuis le stockage local

    const handleSubmit = (event) => {
        event.preventDefault();
        // Préparer le JSON pour l'envoi
        const newRegion = {
            Nom: region.Nom,
        };

        fetch("http://192.168.1.120:8000/api/admin/regions/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRegion),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Rediriger vers la liste des régions après la création
                navigate("/admin/regions");
            })
            .catch((error) => {
                console.error("Failed to create the region:", error);
            });
    };

    return (
        <div className="container mx-auto mt-10 w-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Ajouter une Région</h1>
            <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nom">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="Nom"
                        value={region.Nom}
                        onChange={(e) => setRegion({ ...region, Nom: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Ajouter la région
                </button>
            </form>
        </div>
    );
};

export default AjouterRegion;
