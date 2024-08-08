// src/login/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logins from "./Login.module.scss";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/users", {
        username: username,
        password: password,
      });

      if (response.data.token) {
        // Lưu trữ token và userId vào localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId); 
        localStorage.setItem("loggedIn", "true");
        onLogin(); 
        navigate("/");
      }
    } catch (error) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.");
      // console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <div className={Logins.div}>
      <div className={Logins.div1}>
        <h2 style={{ marginBottom: "25px" }}>Đăng nhập</h2>
        {error && <div className={Logins.error}>{error}</div>}
        <div className={Logins.input}>
          <div style={{ display: "flex" }}>
            <i
              className="bi bi-person-fill"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                backgroundColor: "#495057d9",
                height: "37.5px",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                color: "white",
              }}
            ></i>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              style={{
                marginBottom: "15px",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <i
              className="bi bi-key-fill"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                backgroundColor: "#495057d9",
                height: "37.5px",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                color: "white",
              }}
            ></i>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{
                marginBottom: "15px",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
            />
          </div>
          <button onClick={handleLogin} className={Logins.button}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
