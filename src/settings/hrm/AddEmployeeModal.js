import React, { useState } from "react";
import SettingHRMS from "../scss/SettingHRM.module.scss";

const AddEmployeeModal = ({ isOpen, onClose, onSave }) => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    ngaysinh: "",
    email: "",
    phone: "",
    diachi: "",
    trinhdo: "",
    role: "Nhân viên", // Mặc định là Nhân viên
    img: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employeeData);
    setEmployeeData({
      name: "",
      ngaysinh: "",
      email: "",
      phone: "",
      diachi: "",
      trinhdo: "",
      role: "Nhân viên",
      img: "",
      username: "",
      password: "",
    });
  };

  return (
    <div
      className={`${SettingHRMS.addEmployeeModal} ${
        isOpen ? SettingHRMS.show : ""
      }`}
    >
      <div className={SettingHRMS.modalContent}>
        <h2>Thêm mới nhân viên</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <div>
              <label>
                Tên:
                <input
                  type="text"
                  name="name"
                  value={employeeData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Ngày sinh:
                <input
                  type="text"
                  name="ngaysinh"
                  value={employeeData.ngaysinh}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Điện thoại:
                <input
                  type="tel"
                  name="phone"
                  value={employeeData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Địa chỉ:
                <input
                  type="text"
                  name="diachi"
                  value={employeeData.diachi}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Trình độ:
                <input
                  type="text"
                  name="trinhdo"
                  value={employeeData.trinhdo}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Đường dẫn URl:
                <input
                  type="text"
                  name="img"
                  value={employeeData.img}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Vị trí:
                <input
                  type="text"
                  name="role"
                  value={employeeData.role}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Tên tài khoản:
                <input
                  type="text"
                  name="username"
                  value={employeeData.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Mật khẩu:
                <input
                  type="text"
                  name="password"
                  value={employeeData.password}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div>
            <button type="submit" >Lưu</button>
            <button type="button" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
