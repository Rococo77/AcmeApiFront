// AuthContext.js
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
