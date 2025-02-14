import { useEffect, useState, useContext } from "react";
import { getCustomers } from "../services/bankerService";
import { BankerAuthContext } from "../context/BankerContext";
import { useNavigate } from "react-router-dom";

const BankerAccounts = () => {
    const [customers, setCustomers] = useState([]);
    const { token } = useContext(BankerAuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getCustomers(token);
            setCustomers(data);
        };
        fetchCustomers();
    }, [token]);

    return (
        <div>
            <h2>Customer Accounts</h2>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id} onClick={() => navigate(`/banker/customers/${customer.id}/transactions`)}>
                        {customer.name} ({customer.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BankerAccounts;
