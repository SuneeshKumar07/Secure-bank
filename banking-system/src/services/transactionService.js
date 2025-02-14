const API_URL = "http://localhost:5000/api/transactions/";

export const getTransactions = async (userId) => {
    try {
        const response = await fetch("http://localhost:5000/api/transactions/historytransactions", {
            method: "POST",
            headers: {
                
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data=await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return { transactions: [], balance: 0 };
    }
};


export const depositMoney = async (userId,amount) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/deposit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId,amount }),
        });

        return await response.json();
    } catch (error) {
        console.error("Deposit error:", error);
        return { error: "Deposit failed" };
    }
};
export const getBalance = async (userId) => {
    try {
        console.log("Callling Getbalance")
        const response = await fetch(`${API_URL}/balance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        return await response.json();
    } catch (error) {
        console.error("Deposit error:", error);
        return { error: "Deposit failed" };
    }
};

export const withdrawMoney = async (userId,amount) => {
    try {
      console.log("callinf withdraw money")
        const response = await fetch(`${API_URL}/withdraw`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId,amount }),
        });
        return await response.json();
    } catch (error) {
        console.error("Withdrawal error:", error);
        return { error: "Withdrawal failed" };
    }
};
