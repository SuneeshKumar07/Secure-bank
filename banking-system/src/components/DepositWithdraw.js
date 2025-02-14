import { useState } from "react";
import { depositMoney, withdrawMoney } from "../services/transactionService";
import "../styles/DepositWithdraw.css";

const DepositWithdraw = ({ type, balance, close }) => {
    const [amount, setAmount] = useState("");

    const handleSubmit = async () => {
        const userId=localStorage.getItem("userId");
        console.log("Deposioting iuse",userId)
        if (type === "withdraw" && amount > balance) {
            alert("Insufficient funds");
            return;
        }
        type === "deposit" ? await depositMoney(userId,amount) : await withdrawMoney(userId,amount);
        window.location.reload();
        close();
    };

    return (
        <div className="modal">
            <h2>{type === "deposit" ? "Deposit Money" : "Withdraw Money"}</h2>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={close}>Cancel</button>
        </div>
    );
};

export default DepositWithdraw;