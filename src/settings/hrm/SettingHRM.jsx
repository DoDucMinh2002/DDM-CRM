import React, { useState, useEffect } from "react";
import SettingHRMS from "../scss/SettingHRM.module.scss";
import Head from "../../headlast/Head";
import axios from "axios";
import AddEmployeeModal from "./AddEmployeeModal"; // Import modal component
import Set from "../scss/Setting.module.scss";
import { Link } from "react-router-dom";

function SettingHRM() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        const filteredEmployees = response.data.filter(
          (employee) => employee.role === "Nhân viên"
        );
        setEmployees(filteredEmployees);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setIsLoading(false);
      });
  }, []);

  const handleEmployeeClick = (employee) => {
    if (selectedEmployee && selectedEmployee.id === employee.id) {
      setIsVisible(!isVisible);
    } else {
      setSelectedEmployee(employee);
      setIsVisible(true);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

 const handleSaveEmployee = (newEmployee) => {
   const token = localStorage.getItem("token"); // Lấy token từ localStorage

   axios
     .post("http://localhost:3001/api/users", newEmployee, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
     .then((response) => {
       console.log("Response from server:", response.data);
       const updatedEmployees = [...employees, response.data];
       setEmployees(updatedEmployees);
       setIsModalOpen(false);
     })
     .catch((error) => {
       console.error("Lỗi khi thêm nhân viên:", error);
     });
 };



  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = (id) => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        const updatedEmployees = employees.filter(
          (employee) => employee.id !== id
        );
        setEmployees(updatedEmployees);
        setSelectedEmployee(null);
        setIsVisible(false);
      })
      .catch((error) => {
        console.error("Lỗi khi xóa nhân viên:", error);
      });
  };

  if (isLoading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className={SettingHRMS.settingHRMContainer}>
      <Head />
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2
          style={{
            paddingLeft: "200px",
            fontFamily: "cursive",
            color: "#0a58ca",
          }}
        >
          Quản lý nhân sự
        </h2>
        <button className={SettingHRMS.buttonTM} onClick={handleAddClick}>
          Thêm mới nhân viên
        </button>
        <Link to="/settings" className={SettingHRMS.buttonQL}>
          <i class="bi bi-arrow-90deg-left"></i>
        </Link>
      </div>
      <div className={SettingHRMS.content}>
        <div className={SettingHRMS.employeeList}>
          {employees.map((employee) => (
            <div
              key={employee.id}
              className={SettingHRMS.employeeItem}
              onClick={() => handleEmployeeClick(employee)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "250px",
                  fontFamily: "cursive",
                  justifyContent: "center",
                }}
              >
                <img
                  src={employee.img}
                  alt={employee.name}
                  style={{
                    width: "40px",
                    height: "45px",
                    marginRight: "15px",
                    borderRadius: "5px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderLeft: "1px solid",
                    paddingLeft: "12px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      marginBottom: "0",
                      borderBottom: "1px solid",
                    }}
                  >
                    {employee.name}
                  </h3>
                  <i className="bi bi-arrow-down"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`${SettingHRMS.employeeDetails} ${
            isVisible ? SettingHRMS.show : ""
          }`}
        >
          {selectedEmployee && isVisible && (
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex" }}>
                <h2>Thông tin chi tiết</h2>
                <button
                  className={SettingHRMS.buttonx}
                  onClick={() => handleDeleteEmployee(selectedEmployee.id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    // marginRight: "17px",
                    borderRight: "2px solid",
                    paddingRight: "17px",
                    marginRight: "33px",
                  }}
                >
                  <img
                    src={selectedEmployee.img}
                    alt={selectedEmployee.name}
                    style={{
                      width: "300px",
                      height: "380px",
                      marginRight: "15px",
                      borderRadius: "17px",
                    }}
                  />
                </div>
                <div>
                  <div className={Set.divInfo}>
                    <div className={Set.divStrong}>
                      <strong className={Set.strong}>Họ và tên: </strong>{" "}
                      {selectedEmployee.name || "Không có thông tin"}
                    </div>
                    <div className={Set.divStrong}>
                      <strong className={Set.strong}>Ngày sinh: </strong>{" "}
                      {selectedEmployee.ngaysinh || "Không có thông tin"}
                    </div>
                    <div className={Set.divStrong}>
                      <strong className={Set.strong}>Email: </strong>{" "}
                      {selectedEmployee.email || "Không có thông tin"}
                    </div>
                    <div className={Set.divStrong}>
                      <strong className={Set.strong}>Số điện thoại: </strong>{" "}
                      {selectedEmployee.phone || "Không có thông tin"}
                    </div>
                    <div className={Set.divStrong}>
                      <strong className={Set.strong}>Quê quán: </strong>{" "}
                      {selectedEmployee.diachi || "Không có thông tin"}
                    </div>
                    <div className={Set.divStrong}>
                      <strong className={Set.strong}>Trình độ: </strong>{" "}
                      {selectedEmployee.trinhdo || "Không có thông tin"}
                    </div>
                    <div className={Set.divStrong}>
                      <strong className={Set.strong}>Vị trí: </strong>{" "}
                      {selectedEmployee.role || "Không có thông tin"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "50px",
          background: "rgb(42, 63, 84)",
          marginTop: "57px",
          color: "white",
        }}
      >
        CRM@DDM
      </div>
      {/* AddEmployeeModal */}
      {isModalOpen && (
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEmployee}
        />
      )}
    </div>
  );
}

export default SettingHRM;
