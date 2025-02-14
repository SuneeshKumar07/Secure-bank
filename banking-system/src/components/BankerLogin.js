import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authservice";
import { loginBanker } from "../services/bankerService";

const BankerLogin = () => {
    const { setToken } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await loginBanker(email, password);
        
        console.log(data.role)
        if (data.token && data.role === "banker") {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role","banker")
            navigate("/banker-dashboard");
            window.location.reload();
        } else {
            alert("Invalid credentials or not a banker");
        }
    };

    return (
        <div>
            <h2>Banker Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default BankerLogin;