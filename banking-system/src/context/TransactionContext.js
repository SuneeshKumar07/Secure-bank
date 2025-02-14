import { createContext, useState, useEffect, useContext } from "react";
import { getTransactions, depositMoney, withdrawMoney } from "../services/transactionService";
import { AuthContext } from "./AuthContext";

export const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (token) {
            fetchTransactions();
        }
    }, [token]);

    const fetchTransactions = async () => {
        const data = await getTransactions(token);
        setTransactions(data.transactions);
        setBalance(data.balance);
    };

    const deposit = async (amount) => {
        const result = await depositMoney(amount);
        if (result.success) {
            fetchTransactions();
        }
        return result;
    };

    const withdraw = async (amount) => {
        const result = await withdrawMoney(amount);
        if (result.success) {
            fetchTransactions();
        }
        return result;
    };

    return (
        <TransactionContext.Provider value={{ transactions, balance, deposit, withdraw }}>
            {children}
        </TransactionContext.Provider>
    );
};

export default TransactionProvider;
