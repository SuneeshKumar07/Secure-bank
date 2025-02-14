import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import TransactionProvider from "./context/TransactionContext";
import BankerProvider from "./context/BankerContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import BankerLoginPage from "./pages/BankerLoginPage";
import CustomerDashboard from "./pages/customerDashboard";
import BankerDashboardPage from "./pages/BankerDashboard";
import NotFound from "./pages/NotFound";

function App() {
    const [role, setRole] = useState(localStorage.getItem("role") || "none");

    useEffect(() => {
        setRole(localStorage.getItem("role") || "none");
    }, []);

    return (
        <AuthProvider>
            <TransactionProvider>
                <BankerProvider>
                    <Router>
                        <Navbar role={role} /> {/* ✅ Passing role to Navbar */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/banker-login" element={<BankerLoginPage />} />
                            
                            {/* ✅ Protected Customer Route */}
                            <Route
                                path="/customer-dashboard"
                                element={role === "customer" ? <CustomerDashboard /> : <Navigate to="/login" />}
                            />

                            {/* ✅ Protected Banker Route */}
                            <Route
                                path="/banker-dashboard"
                                element={role === "banker" ? <BankerDashboardPage /> : <Navigate to="/banker-login" />}
                            />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </BankerProvider>
            </TransactionProvider>
        </AuthProvider>
    );
}

export default App;
