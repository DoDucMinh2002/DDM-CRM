import React, { useState } from "react";
import Set from "../settings/scss/Setting.module.scss";

function ModalEdit({ user, onSave }) {
  // Initialize state with user data or default values
  const [name, setName] = useState(user ? user.name : "");
  const [ngaysinh, setNgaysinh] = useState(user ? user.ngaysinh : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [diachi, setDiachi] = useState(user ? user.diachi : "");
  const [trinhdo, setChinhdo] = useState(user ? user.trinhdo : "");
  const [role, setRole] = useState(user ? user.role : "");
  const [img, setImg] = useState(user ? user.img : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [password, setPassword] = useState(user ? user.password : "");
  // Function to handle save
  const handleSave = () => {
    if (onSave) {
      onSave({
        name,
        ngaysinh,
        email,
        phone,
        diachi,
        trinhdo,
        role,
        img, // The updated image
        username,
        password,
      }); // Gọi hàm lưu
    }
  };

  return (
    <div className={Set.modalDiv}>
      <div className={Set.divImg}>
        <div style={{ textAlign: "center", padding: "20px", display:'flex', flexDirection:"column" }}>
          <img src={img} alt="User Profile" className={Set.imgx} />
          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className={Set.inputimg}
          />
        </div>
      </div>
      <div className={Set.modalTT}>
        <div
          className={Set.divInfo}
          style={{
            display: "flex",
            alignItems: "self-start",
            flexDirection: "column",
            marginTop: "18px",
            padding: "30px",
            marginLeft: "25px",
          }}
        >
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Họ và tên: </strong>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={Set.input}
            />
          </div>
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Ngày sinh: </strong>
            <input
              value={ngaysinh}
              onChange={(e) => setNgaysinh(e.target.value)}
              className={Set.input}
            />
          </div>
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Email : </strong>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={Set.input}
            />
          </div>
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Số điện thoại: </strong>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={Set.input}
            />
          </div>
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Quê quán: </strong>
            <input
              value={diachi}
              onChange={(e) => setDiachi(e.target.value)}
              className={Set.input}
            />
          </div>
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Trình độ: </strong>
            <input
              value={trinhdo}
              onChange={(e) => setChinhdo(e.target.value)}
              className={Set.input}
            />
          </div>
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Vị trí: </strong>
            
            <div className={Set.input}>{user.role}</div>
          </div>
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Tài khoản: </strong>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={Set.input}
            />
          </div>
          <div
            className={Set.divStrong}
            style={{ width: "100%", display: "flex" }}
          >
            <strong className={Set.strong}>Mật khẩu: </strong>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={Set.input}
            />
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <button onClick={handleSave} className={Set.buttonl}>
          <i className="bi bi-save"></i>
        </button>
      </div>
    </div>
  );
}

export default ModalEdit;
