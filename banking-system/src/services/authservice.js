const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (email, password) => {
    console.log("calling api")
    try {
        console.log("inside try")
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }
        return data;
    } catch (error) {
        console.error("Login error:", error);
        return { error: error.message };
    }
};
