import { createContext, useState, useEffect } from "react";
import { loginBanker } from "../services/bankerService";

export const BankerAuthContext = createContext();

const BankerAuthProvider = ({ children }) => {
    const [banker, setBanker] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("bankerToken") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("bankerToken", token);
        } else {
            localStorage.removeItem("bankerToken");
        }
    }, [token]);

    const login = async (email, password) => {
        const data = await loginBanker(email, password);
        if (data.token) {
            setToken(data.token);
            setBanker(data.banker);
        }
        return data;
    };

    const logout = () => {
        setBanker(null);
        setToken(null);
        localStorage.removeItem("bankerToken");
    };

    return (
        <BankerAuthContext.Provider value={{ banker, token, login, logout }}>
            {children}
        </BankerAuthContext.Provider>
    );
};

export default BankerAuthProvider;
