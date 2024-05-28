import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import api from "../api/api"; 

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useContext(AuthContext);
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login_check", {
                username,
                password
            });

            if (response.status === 200) {
                const { token } = response.data;
                console.log("Connexion réussie:", response.data);
                login(token, response.data.user); // Supposant que la fonction login prend le token et les données utilisateur
                setToken(token);
                localStorage.setItem("authToken", token); // Stocker le token dans le localStorage
                navigate("/");
            } else {
                // Cette partie du code ne sera jamais atteinte car axios lance une exception pour les statuts d'erreur
                setError("Erreur lors de la connexion");
            }
        } catch (error) {
            // Gestion des erreurs d'axios
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un statut hors de la plage 2xx
                console.error("Erreur lors de la connexion:", error.response.status, error.response.data);
                setError(error.response.data.message || "Erreur lors de la connexion");
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                setError("Le serveur n'a pas répondu");
            } else {
                // Quelque chose s'est produit lors de la configuration de la requête qui a déclenché une erreur
                setError("Erreur lors de la configuration de la requête");
            }
            console.error("Erreur réseau ou erreur de serveur:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 text-center">Connexion</h2>
                <div className="space-y-4 mt-6">
                    <input
                        type="email"
                        name="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Se connecter
                </button>
                <Link to="/signin" className="text-yellow-600 hover:text-yellow-900 ml-4">
                  S&apos;inscrire
                </Link>
            </form>
        </div>
    );
};

export default LoginForm;