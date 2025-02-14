import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Import CSS file

const Navbar = ({ role }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("role");
        navigate("/");
        window.location.reload(); // Refresh the page after logout
    };

    return (
        <nav className="navbar">
            <div className="logo">SecureBank</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                
                {role === "customer" && <li><Link to="/customer-dashboard">Customer Dashboard</Link></li>}
                {role === "banker" && <li><Link to="/banker-dashboard">Banker Dashboard</Link></li>}
                
                {!role || role === "none" ? (
                    <>
                        <li><Link to="/login">Customer Login</Link></li>
                        <li><Link to="/banker-login">Banker Login</Link></li>
                    </>
                ) : (
                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
