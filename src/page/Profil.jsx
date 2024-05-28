import  { useContext } from "react";
import { AuthContext } from "../AuthContext";
const Profil = () => {
    const { user, logout } = useContext(AuthContext);
     // Utilisez le token et la fonction de déconnexion
    console.log(user)
    if (!user) {
        return <p>Chargement des informations utilisateur...</p>;
    }
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-md min-h-screen">
    <h2 className="text-2xl font-bold mb-4">Profil de l&apos;utilisateur</h2>
    <p className="mb-2">
        <strong>Nom :</strong> {user.data.Nom}
    </p>
    <p className="mb-2">
        <strong>Prénom :</strong> {user.data.Prenom}
    </p>
    <p className="mb-2">
        <strong>Email :</strong> {user.data.Email}
    </p>
    <p className="mb-2">
        <strong>Adresse :</strong> {user.data.Adresse}
    </p>
    <p className="mb-2">
        <strong>Ville :</strong> {user.data.Ville}
    </p>
    <p className="mb-2">
        <strong>Code Postal :</strong> {user.data.Zip}
    </p>
    <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
        Se déconnecter
    </button>
</div>
    );
};

export default Profil;