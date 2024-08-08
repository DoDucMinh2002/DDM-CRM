// src/navbar/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbars from "./Navbar.module.scss";

const Navbar = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `http://localhost:3001/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    if (loggedIn) {
      fetchUser();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return null;
  }

  return (
    <nav
      style={{
        width: "18%",
        height: "100vh",
        backgroundColor: "#2A3F54",
      }}
    >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className={Navbars.liw}>
          <i className="bi bi-hospital-fill"></i>
          <h2 style={{ marginLeft: "15px" }}>Welcome</h2>
        </li>
        <li
          style={{
            height: "70px",
            width: "100%",
            display: "flex",
            marginBottom: "15px",
          }}
        >
          <button onClick={onLogout} className={Navbars.button}>
            <i
              className="bi bi-box-arrow-left"
              style={{ fontSize: "27px" }}
            ></i>
          </button>
          {user && (
            <img
              className={Navbars.img}
              src={user.img || ""}
              alt={user.name || "No name"}
            />
          )}
          {user && <h4 className={Navbars.h4}>{user.name}</h4>}
        </li>
        <div style={{ borderBottom: "3px solid white" }}></div>
        <li
          className="nav-item"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "35px",
          }}
        >
          <Link to="/" className={Navbars.linkTQ}>
            <i className="bi bi-house-fill"></i> Trang chủ
          </Link>
        </li>
        <li
          className="nav-item"
          style={{
            margin: "5px 5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/customers" className={Navbars.link}>
            <i className="bi bi-person-fill" style={{ marginRight: "5px" }}></i>
            : Khách hàng
          </Link>
        </li>
        <li
          className="nav-item"
          style={{
            margin: "5px 5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/orders" className={Navbars.link}>
            <i
              className="bi bi-box-seam-fill"
              style={{ marginRight: "8px" }}
            ></i>{" "}
            : Đơn hàng
          </Link>
        </li>
        <li
          className="nav-item"
          style={{
            margin: "5px 5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/products" className={Navbars.link}>
            <i className="bi bi-cart3" style={{ marginRight: "8px" }}></i> : Sản
            phẩm
          </Link>
        </li>
        <li
          className="nav-item"
          style={{
            margin: "5px 5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/settings" className={Navbars.link}>
            <i
              className="bi bi-gear-wide-connected"
              style={{ marginRight: "8px" }}
            ></i>{" "}
            : Cài đặt cá nhân
          </Link>
        </li>
      </ul>
      <button onClick={onLogout} className={Navbars.button1}>
        <i className="bi bi-box-arrow-left" style={{ fontSize: "27px" }}></i>
      </button>
    </nav>
  );
};

export default Navbar;
