import React, { useState, useEffect } from "react";
import axios from "axios";
import Set from "../settings/scss/Setting.module.scss";
import ModalEdit from "./ModalEdit";
import Head from "../../src/headlast/Head";
import Last from "../../src/headlast/Last";
import { Link } from "react-router-dom";
const Settings = () => {
  const [user, setUser] = useState(null); // Khởi tạo với null
  const [showModal, setShowModal] = useState(false); // Trạng thái mở/đóng modal
  // Lấy thông tin người dùng theo ID
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Gửi token trong header nếu cần
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
    fetchUser();
  }, []);
  // Mở Modal
  const handleOpenModal = () => {
    setShowModal(true);
  };
  // Lưu thông tin người dùng
  const handleSaveUsers = async (updatedUser) => {
    const userId = user.id;
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${userId}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(response.data); // Cập nhật trạng thái với dữ liệu người dùng mới
      setShowModal(false); // Đóng modal sau khi lưu
    } catch (error) {
      console.error(
        "Lỗi khi lưu thông tin người dùng:",
        error.response?.data || error.message
      );
    }
  };

  // Đóng Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={Set.div}>
      <Head />
      <div className={Set.divF}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ fontFamily: "serif" }}>Thông tin Chủ Tài khoản</h2>
          <button className={Set.buttonXua} onClick={handleOpenModal}>
            Sửa
          </button>
          {user && user.role === "Quản lý" && (
            <Link to="/SettingHRM">
              <button className={Set.link}>Danh sách nhân sự</button>
            </Link>
          )}
        </div>

        <div style={{ display: "flex", padding: "35px" }}>
          <div className={Set.divImg}>
            <h4 style={{ fontSize: "25px", fontFamily: "serif" }}>Hình ảnh</h4>
            {user ? (
              <img className={Set.img} src={user.img} alt={user.name} />
            ) : (
              <div>Không có ảnh</div>
            )}
          </div>

          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4 style={{ fontSize: "25px", fontFamily: "serif" }}>Thông tin</h4>
            {user ? (
              <div className={Set.divInfo}>
                <div className={Set.divStrong}>
                  <strong className={Set.strong}>Họ và tên: </strong>{" "}
                  {user.name || "Không có thông tin"}
                </div>
                <div className={Set.divStrong}>
                  <strong className={Set.strong}>Ngày sinh: </strong>{" "}
                  {user.ngaysinh || "Không có thông tin"}
                </div>
                <div className={Set.divStrong}>
                  <strong className={Set.strong}>Email: </strong>{" "}
                  {user.email || "Không có thông tin"}
                </div>
                <div className={Set.divStrong}>
                  <strong className={Set.strong}>Số điện thoại: </strong>{" "}
                  {user.phone || "Không có thông tin"}
                </div>
                <div className={Set.divStrong}>
                  <strong className={Set.strong}>Quê quán: </strong>{" "}
                  {user.diachi || "Không có thông tin"}
                </div>
                <div className={Set.divStrong}>
                  <strong className={Set.strong}>Trình độ: </strong>{" "}
                  {user.trinhdo || "Không có thông tin"}
                </div>
                <div className={Set.divStrong}>
                  <strong className={Set.strong}>Vị trí: </strong>{" "}
                  {user.role || "Không có thông tin"}
                </div>
              </div>
            ) : (
              <div>Đang tải dữ liệu...</div>
            )}
          </div>
        </div>
      </div>
      <Last />
      {showModal && (
        <div className={Set.modalBackdrop}>
          <div className={Set.modalContent}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Chỉnh sửa thông tin</h3>
              <button onClick={handleCloseModal} className={Set.buttond}>
                <i className="bi bi-x-square-fill"></i>
              </button>
            </div>
            <ModalEdit
              user={user}
              onSave={handleSaveUsers}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
