import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            fetchUserData(storedToken);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch("http://192.168.1.120:8000/api/admin/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.status === "success") {
                setUser(data.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations utilisateur:", error);
        }
    };

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setToken(token);
        fetchUserData(token);
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};
