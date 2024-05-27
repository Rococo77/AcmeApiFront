import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { username, password };
        alert(`JSON envoyé : ${JSON.stringify(payload)}`);

        try {
            const response = await fetch("http://192.168.1.120:8000/api/login_check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Connexion réussie ! Réponse de l'API : ${JSON.stringify(data)}`);
                setAuthToken(data.token);
                localStorage.setItem("authToken", data.token); // Stocker le token dans le localStorage
                navigate("/");
            } else {
                const errorData = await response.json();
                alert(`Erreur lors de la connexion : ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            alert(`Erreur réseau : ${error.message}`);
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
                    S'inscrire
                </Link>
            </form>
        </div>
    );
};

export default LoginForm;
