import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const UserPanierDetails = () => {
    const [panier, setPanier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const userId = user.id;
    const { token } = useContext(AuthContext); // Assurez-vous que le token est disponible

    useEffect(() => {
        const fetchPanier = async () => {
            try {
                const apiUrl = `http://192.168.1.120:8000/api/admin/panier/user/${userId}`;
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
                setPanier(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchPanier();
        }
    }, [userId, token]);

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
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Détails du Panier</h1>
                    {panier && panier.items.length > 0 ? (
                        <div>
                            {panier.items.map((item) => (
                                <div key={item.id} className="mb-4">
                                    <h2 className="text-2xl font-bold">{item.plat.Nom}</h2>
                                    <p>Quantité: {item.quantité}</p>
                                    <p>Prix unitaire: {item.plat.PrixUnit}€</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Le panier est vide.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPanierDetails;
