import "../styles/CustomerDashboard.css"; // Import CSS file
import Transactions from "../components/Transactions";

const CustomerDashboard = () => {
    return (
        <div className="customer-dashboard-container">
            <h1 style={{marginTop:"7rem"}}>Customer Dashboard</h1>
            
                <Transactions />
            
        </div>
    );
};

export default CustomerDashboard;