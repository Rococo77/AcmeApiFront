import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
    const [regions, setRegions] = useState([]);
    const { token } = useContext(AuthContext); // Utilisez le token et la fonction de déconnexion

    useEffect(() => {
        const apiUrl = "http://192.168.1.120:8000/api/admin/regions/";

        const fetchRegions = async () => {
            try {
                const response = await fetch(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ajoutez le token d'authentification
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données");
                }

                const data = await response.json();
                console.log("Données récupérées:", data); // Débogage : Afficher les données récupérées
                setRegions(data);
            } catch (error) {
                console.error("Erreur de fetch:", error);
            }
        };

        if (token) {
            fetchRegions();
        }
    }, [token]);

    return (
        <nav className="bg-red-600 text-white py-4 justify-center">
            <div className="container mx-auto flex flex-row justify-between items-center">
                <ul className="flex flex-row justify-center w-screen">
                    {token ? (
                        <>
                            <li className="mx-4">
                                <Link to="/">Accueil</Link>
                            </li>
                            <li className="mx-4">
                                <Link to="/menu">Toutes les régions</Link>
                            </li>
                            <li className="mx-4">
                                {regions.length > 0 ? (
                                    <ul className="flex flex-row">
                                        {regions.map((region) => (
                                            <li key={region.id} className="mx-2">
                                                <Link to={`/menu/${region.id}`}>{region.Nom}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Chargement des régions...</p>
                                )}
                            </li>
                            <li className="mx-4">
                                <Link to="/panier">Panier</Link>
                            </li>
                            <li className="mx-4">
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li className="mx-4">
                                <Link to="/profil">Profil</Link>
                            </li>

                            <li className="mx-4">
                                <Link to="/admin/plats">AdminPlat</Link>
                            </li>
                            <li className="mx-4">
                                <Link to="/admin/regions">AdminReg</Link>
                            </li>
                        </>
                    ) : (
                        <li className="mx-4">
                            <Link to="/login">Profil</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
