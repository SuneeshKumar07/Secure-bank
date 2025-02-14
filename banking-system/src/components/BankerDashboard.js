import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllCustomers, getTransactionHistory } from "../services/bankerService";
import "../styles/BankerDashboard.css"; // Import CSS

const BankerDashboard = () => {
    const { token } = useContext(AuthContext);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await getAllCustomers(token);
            setCustomers(data);
        };
        fetchCustomers();
    }, [token]);

    const openModal = async (customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
        const history = await getTransactionHistory(customer.user_id, token);
        setTransactions(history);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTransactions([]);
        setSelectedCustomer(null);
    };

    return (
        <div>
            <div className="bankerdash">
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.user_id} onClick={() => openModal(customer)}>
                            {customer.username} - ${customer.balance}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Transaction History Modal */}
            {isModalOpen && (
                <div className="modal">
                    <h3>Transaction History for {selectedCustomer?.username}</h3>

                    {transactions.length > 0 ? (
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>Sr. No</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                    <th>Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{txn.type}</td>
                                        <td>${txn.amount}</td>
                                        <td>${txn.balance}</td>
                                        <td>{new Date(txn.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No transactions found.</p>
                    )}

                    <button onClick={closeModal} className="close-button">Close</button>
                </div>
            )}
        </div>
    );
};

export default BankerDashboard;
