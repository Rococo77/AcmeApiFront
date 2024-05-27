import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
const Profil = () => {
    const { user } = useContext(AuthContext);
    const { logout } = useContext(AuthContext); // Utilisez le token et la fonction de déconnexion

    if (!user) {
        return <p>Chargement des informations utilisateur...</p>;
    }

    return (
        <div>
            <h2>Profil de l'utilisateur</h2>
            <p>
                <strong>Nom :</strong> {user.id}
            </p>
            <p>
                <strong>Nom :</strong> {user.Nom}
            </p>
            <p>
                <strong>Prénom :</strong> {user.Prenom}
            </p>
            <p>
                <strong>Email :</strong> {user.Email}
            </p>
            <p>
                <strong>Adresse :</strong> {user.Adresse}
            </p>
            <p>
                <strong>Ville :</strong> {user.Ville}
            </p>
            <p>
                <strong>Code Postal :</strong> {user.Zip}
            </p>
            <button onClick={logout}>Se déconnecter</button>
        </div>
    );
};

export default Profil;
