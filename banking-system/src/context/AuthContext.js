import React, { createContext, useState, useEffect } from "react";
import { loginUser } from "../services/authservice"; // Ensure this file exists

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const login = async (email, password) => {
        const data = await loginUser(email, password);
        if (data.token) {
            setToken(data.token);
            setUser(data.user);
        }
        return data;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
