import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const UserPanierDetails = () => {
    const [panier, setPanier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commandeCreated, setCommandeCreated] = useState(false);
    const { user } = useContext(AuthContext);
    const userId = user.id;
    const { token } = useContext(AuthContext);

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
                console.log("Fetched Panier:", data);
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

    const handleDeletePanier = async () => {
        if (!panier || !panier.id) {
            setError("Panier ID is missing.");
            return;
        }

        try {
            const apiUrl = `http://192.168.1.120:8000/api/admin/panier/${panier.id}`;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete: ${response.status} ${response.statusText}`);
            }

            console.log("Panier deleted successfully.");
            setPanier(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCreateCommande = async () => {
        if (!panier || !panier.id) {
            setError("Panier ID is missing.");
            return;
        }

        try {
            const apiUrl = `http://192.168.1.120:8000/api/admin/commande/user-${userId}/panier-${panier.id}`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to create commande: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Commande created successfully:", data);
            setCommandeCreated(true); // Marquer la commande comme créée
        } catch (error) {
            setError(error.message);
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Détails du Panier</h1>
                    {panier && panier.items && panier.items.length > 0 ? (
                        <div>
                            {panier.items.map((item) => (
                                <div key={item.id} className="mb-4">
                                    <h2 className="text-2xl font-bold">{item.plat.Nom}</h2>
                                    <p>Quantité: {item.quantité}</p>
                                    <p>Prix unitaire: {item.plat.PrixUnit}€</p>
                                </div>
                            ))}
                            <button onClick={handleCreateCommande} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                                Passer commande
                            </button>
                            <button onClick={handleDeletePanier} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                                Supprimer le panier
                            </button>
                            {commandeCreated && (
                                <Link to={`/commande`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    Voir la commande
                                </Link>
                            )}
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
