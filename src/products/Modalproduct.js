import React from "react";
import Modalq from "../products/scss/Modaiproduct.module.scss"; // Đường dẫn đến tệp SCSS tùy chỉnh

const ModalCustom = ({ show, onClose, children }) => {
  if (!show) {
    return null; // Nếu `show` là false, không hiển thị modal
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Đóng modal khi nhấp vào backdrop
    }
  };

  return (
    <div className={Modalq.modalbackdrop} onClick={handleBackdropClick}>
      <div className={Modalq.modalcontent}>
        {/* <h2>{product ? "Chỉnh sửa Sản phẩm" : "Thêm Sản phẩm Mới"}</h2> */}
        <button className={Modalq.modalclose} onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        {children} {/* Nội dung modal */}
      </div>
    </div>
  );
};

export default ModalCustom;
