import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import api from "../api/api";


const UserPanierDetails = () => {
    const [panier, setPanier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useContext(AuthContext);
    const userId = user.data.id;
    

    useEffect(() => {
        const fetchPanier = async () => {
            try {
                
                const response = await api.get(`/admin/panier/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        
                    },
                });

                
                setPanier(response.data);
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
        <div className="container mx-auto py-8 min-h-screen">
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