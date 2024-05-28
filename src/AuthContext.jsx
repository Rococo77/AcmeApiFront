import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // Initialisez le token et l'utilisateur avec des valeurs par défaut sûres
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Erreur lors de la lecture des données utilisateur:", e);
            return null;
        }
    });

    useEffect(() => {
        // Pas besoin de réinitialiser le token et l'utilisateur ici car ils sont déjà initialisés
    }, []);

    const fetchUserData = async (token) => {
        try {
            // Utilisez axios pour envoyer une requête GET
            const response = await axios.get("/admin/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            // Pas besoin de vérifier response.status avec axios, il gère les erreurs avec des exceptions
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            console.error("Erreur lors de la récupération des informations utilisateur:", error);
        }
    };

    const login = (token, userData) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(token);
        setUser(userData);
        fetchUserData(token);
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    return <AuthContext.Provider value={{ token, setToken, user, login, logout }}>{children}</AuthContext.Provider>;
};
