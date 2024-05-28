import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminRegion = () => {
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token"); // Récupère le token depuis le stockage local (ou une autre méthode que vous utilisez)

    useEffect(() => {
        fetch("http://192.168.1.120:8000/api/admin/regions/", {
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
                setRegions(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des régions:", error);
                setLoading(false);
            });
    }, [token]);

    const handleDelete = (id) => {
        fetch(`http://192.168.1.120:8000/api/admin/regions/${id}`, {
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
                setRegions(regions.filter((region) => region.id !== id));
            })
            .catch((error) => {
                console.error("Failed to delete the region:", error);
            });
    };

    if (loading) {
        return <div>Chargement des régions...</div>;
    }

    return (
        <div className="flex justify-center mt-10 w-screen">
            <div className="w-full max-w-6xl">
                <h1 className="text-2xl font-bold text-center mb-6">Gestion des Régions</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nom
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {regions.map((region) => (
                                <tr key={region.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{region.Nom}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{region.Description}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <Link to={`/admin/regions/modifier/${region.id}`} className="text-blue-600 hover:text-blue-900">
                                            Modifier
                                        </Link>
                                        <button onClick={() => handleDelete(region.id)} className="text-red-600 hover:text-red-900 ml-4">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/admin/regions/ajouter" className="text-green-600 hover:text-green-900 ml-4">
                        Ajouter une région
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminRegion;
