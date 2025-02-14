import "../styles/LoginPage.css";
import Login from "../components/Login";
import BankerLogin from "../components/BankerLogin";

const LoginPage = () => {
    return (
        <div className="login-container">
            <h1>Banker Login</h1>
            <div className="login-box">
                <BankerLogin />
            </div>
        </div>
    );
};

export default LoginPage;