import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ModifierRegion = () => {
    const [region, setRegion] = useState({ Nom: "", description: "" });
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Récupère le token depuis le stockage local

    useEffect(() => {
        fetch(`http://192.168.1.120:8000/api/admin/regions/${id}`, {
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
            .then((data) => setRegion(data))
            .catch((error) => console.error("Erreur lors de la récupération de la région:", error));
    }, [id, token]);

    const handleUpdate = (event) => {
        event.preventDefault();
        // Préparer le JSON avec uniquement le champ "nom" en minuscules
        const updatedRegion = {
            nom: region.Nom,
        };

        fetch(`http://192.168.1.120:8000/api/admin/regions/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRegion),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                navigate("/admin/regions"); // Rediriger vers la liste des régions après la mise à jour
            })
            .catch((error) => {
                console.error("Failed to update the region:", error);
            });
    };

    if (!region) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mx-auto mt-10 w-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Modifier la Région</h1>
            <form className="w-full max-w-lg mx-auto" onSubmit={handleUpdate}>
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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Mettre à jour la région
                </button>
            </form>
        </div>
    );
};

export default ModifierRegion;
