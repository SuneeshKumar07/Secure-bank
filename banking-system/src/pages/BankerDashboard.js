import "../styles/BankerDashboard.css"; 
import BankerDashboard from "../components/BankerDashboard";

const BankerDashboardPage = () => {
    return (
        <div className="banker-dashboard-container">
            <h1>Banker Dashboard</h1>
            <div className="banker-dashboard">
                <BankerDashboard />
            </div>
        </div>
    );
};

export default BankerDashboardPage;