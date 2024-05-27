import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Assurez-vous que le chemin est correct

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://192.168.1.120:8000/api/login_check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: email, password }), // Assurez-vous que les clés correspondent aux noms attendus par votre API
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Connexion réussie:", data);

                // Utilisez la fonction login du contexte pour stocker le token et les informations utilisateur
                login(data.token, data.user);

                // Rediriger l'utilisateur vers la page d'accueil ou une autre page protégée
                navigate("/");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erreur lors de la connexion");
                console.error("Erreur lors de la connexion:", response.status, errorData.message);
            }
        } catch (error) {
            setError("Erreur réseau");
            console.error("Erreur réseau:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 text-center">Connexion</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="space-y-4 mt-6">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    S'inscrire
                </Link>
            </form>
        </div>
    );
};

export default LoginForm;
