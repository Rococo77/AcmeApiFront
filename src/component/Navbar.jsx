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
        <nav className="bg-red-600 text-white py-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="w-full md:w-auto flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">
                        Logo
                    </Link>
                    <button className="md:hidden text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                <ul className="w-full md:flex md:items-center md:w-auto">
                    {token ? (
                        <>
                            <li className="mx-2">
                                <Link to="/" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    Accueil
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/menu" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    Tous les plats
                                </Link>
                            </li>
                            <li className="mx-2 relative">
                                {regions.length > 0 ? (
                                    <ul className="block py-2 px-4 hover:bg-red-700 rounded">
                                        {regions.map((region) => (
                                            <li key={region.id} className="mx-2">
                                                <Link to={`/menu/${region.id}`} className="block py-1 px-2 hover:bg-red-800 rounded">
                                                    {region.Nom}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="block py-2 px-4">Chargement des régions...</p>
                                )}
                            </li>
                            <li className="mx-2">
                                <Link to="/panier" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    Panier
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/commande" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    Commande
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/contact" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    Contact
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/profil" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    Profil
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/admin/plats" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    AdminPlat
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/admin/regions" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    AdminReg
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/admin/ingredients" className="block py-2 px-4 hover:bg-red-700 rounded">
                                    AdminIng
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li className="mx-2">
                            <Link to="/login" className="block py-2 px-4 hover:bg-red-700 rounded">
                                Profil
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
