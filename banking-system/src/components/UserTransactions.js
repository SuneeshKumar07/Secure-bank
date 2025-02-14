import { useState, useEffect } from "react";
import { getUserTransactions } from "../services/bankerService";
import "../styles/UserTransactions.css";

const UserTransactions = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await getUserTransactions(userId);
            setTransactions(data);
        };
        fetchTransactions();
    }, [userId]);

    return (
        <div className="user-transactions">
            <h2>User Transactions</h2>
            <ul className="transactions-list">
                {transactions.map((tx) => (
                    <li key={tx.id}>
                        <span>{tx.type}</span> <span>${tx.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );    
};

export default UserTransactions;