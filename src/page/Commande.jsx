import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

const Commande = () => {
    const [commande, setCommande] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const userId = user.id;
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchCommande = async () => {
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
                console.log("Fetched Commande:", data);
                setCommande(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCommande();
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Détails de la Commande</h1>
                    {commande ? (
                        <div>
                            <p>ID de la commande: {commande.id}</p>
                            <p>Date de commande: {new Date(commande.Date_Com).toLocaleString()}</p>
                            <h2 className="text-2xl font-bold mt-4">Articles Commandés</h2>
                            {commande.items.map((item) => (
                                <div key={item.id} className="mb-4">
                                    <h3 className="text-xl font-bold">{item.plat.Nom}</h3>
                                    <p>Quantité: {item.quantité}</p>
                                    <p>Prix unitaire: {item.plat.PrixUnit}€</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>La commande est vide.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Commande;
