import { Link } from "react-router-dom";
import "../styles/Home.css"; // Import the CSS file

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Secure Bank!</h1>
            <p>Choose your role to continue</p>
            <Link to="/login">Customer Login</Link>
            <Link to="/banker-login">Banker Login</Link>
        </div>
    );
};

export default Home;