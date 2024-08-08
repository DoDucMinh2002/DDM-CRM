// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "../src/navbar/Navbar";
import Dashboard from "../src/dashboard/Dashboard";
import Customers from "../src/customers/Customers";
import Orders from "../src/orders/Orders";
import Products from "../src/products/Products";
import Settings from "../src/settings/Settings";
import Login from "../src/login/Login";
import ProductDetails from "../src/products/ProductDetails";
import SettingHRM from "./settings/hrm/SettingHRM";
// import Head from "./headlast/Head";
const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {isLoggedIn && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          <Route
            path="/customers"
            element={<PrivateRoute element={<Customers />} />}
          />
          <Route
            path="/orders"
            element={<PrivateRoute element={<Orders />} />}
          />
          <Route
            path="/products"
            element={<PrivateRoute element={<Products />} />}
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/settings"
            element={<PrivateRoute element={<Settings />} />}
          />
           <Route
            path="/settingHRM"
            element={<PrivateRoute element={<SettingHRM />} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
