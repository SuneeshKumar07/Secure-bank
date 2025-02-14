const API_URL = "http://localhost:5000/api/bankers";

export const loginBanker = async (email, password) => {
    try {
        
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        return await response.json();
    } catch (error) {
        console.error("Banker login error:", error);
        return { error: "Login failed" };
    }
};

export const getAllCustomers = async (token) => {
    try {
        const response = await fetch(`http://localhost:5000/api/bankers/customers`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data=await response.json();
        console.log(data)
        
        return data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }
};

export const getTransactionHistory = async (id,token) => {
    console.log("second step",id)
    try {
        const response = await fetch(`http://localhost:5000/api/bankers/gettransactionhistory`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id}),
        });
        const data=await response.json();
        console.log("Txn hisy data0,",data)
        
        return data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }
};


export const getCustomerTransactions = async (token, userId) => {
    try {
        const response = await fetch(`${API_URL}/customers/${userId}/transactions`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return await response.json();
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
};



// const API_URL = "http://localhost:5000/api/banker";

// export const getAllCustomers = async (token) => {
//     try {
//         const response = await fetch(`${API_URL}/customers`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//         });

//         const data = await response.json();
//         console.log(data);
//         return data;
//     } 
//     catch (error) {
//         console.error("Error fetching customers:", error);
//         return [];
//     }
// };

// export const getUserTransactions = async (userId) => {
//     try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`${API_URL}/transactions/${userId}`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//         });

//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching user transactions:", error);
//         return [];
//     }
// };


