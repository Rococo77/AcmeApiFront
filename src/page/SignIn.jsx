import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InscriptionForm = () => {
    const [formData, setFormData] = useState({
        Email: "",
        Nom: "",
        Prenom: "",
        Adresse: "",
        Ville: "",
        Country: "",
        Zip: "",
        Username: "",
        Password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://192.168.1.120:8000/api/open/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Inscription réussie:", data);
                navigate("/login"); // Rediriger vers la page de connexion après l'inscription
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erreur lors de l'inscription");
                console.error("Erreur lors de l'inscription:", response.status, errorData.message);
            }
        } catch (error) {
            setError("Erreur réseau");
            console.error("Erreur réseau:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 text-center">Inscription</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="space-y-4 mt-6">
                    <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="Nom"
                        value={formData.Nom}
                        onChange={handleChange}
                        placeholder="Nom"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="Prenom"
                        value={formData.Prenom}
                        onChange={handleChange}
                        placeholder="Prénom"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="Adresse"
                        value={formData.Adresse}
                        onChange={handleChange}
                        placeholder="Adresse"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="Ville"
                        value={formData.Ville}
                        onChange={handleChange}
                        placeholder="Ville"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="Country"
                        value={formData.Country}
                        onChange={handleChange}
                        placeholder="Pays"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="Zip"
                        value={formData.Zip}
                        onChange={handleChange}
                        placeholder="Code postal"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
                        placeholder="Nom d'utilisateur"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        placeholder="Mot de passe"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default InscriptionForm;
