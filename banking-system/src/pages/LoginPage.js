import Login from "../components/Login";
import "../styles/LoginPage.css"; 

const LoginPage = () => {
    return (
        <div className="login-container">
            <h1>Customer Login</h1>
            <div className="login-box">
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;