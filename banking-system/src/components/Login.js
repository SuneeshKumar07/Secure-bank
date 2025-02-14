import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authservice";

const Login = () => {
    // const { setToken } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email,password);
        const data = await loginUser(email, password);
        console.log(data.user.id)
        if (data.token) {
            console.log("Settign local",data.token," !!!!!!!!!!!!",data.user.id)
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId",data.user.id);
            localStorage.setItem("role","customer");
            navigate("/customer-dashboard");
            window.location.reload();
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;