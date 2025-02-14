import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getBalance, getTransactions } from "../services/transactionService";
import DepositWithdraw from "./DepositWithdraw";
import "../styles/Transactions.css";

const Transactions = () => {
    const { token } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [modalType, setModalType] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem("userId");

            try {
                // Fetch balance
                const balanceData = await getBalance(userId);
                setBalance(balanceData.balance);

                // Fetch transactions
                const transactionsData = await getTransactions(userId);
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Error fetching transactions or balance:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="transactions-container">
            <h2>Transactions</h2>
            <p className="balance">Balance: ${balance}</p>
            <div className="transaction-buttons">
                <button onClick={() => setModalType("deposit")}>Deposit</button>
                <button onClick={() => setModalType("withdraw")}>Withdraw</button>
            </div>

            {modalType && <DepositWithdraw type={modalType} balance={balance} close={() => setModalType(null)} />}

            <ul className="transactions-list">
                {transactions.map((tx) => (
                    <li key={tx.id}>
                        <span>{tx.type.toUpperCase()}</span>
                        <span>${tx.amount}</span>
                        <span>Balance: ${tx.balance}</span>
                        <span>{new Date(tx.created_at).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
