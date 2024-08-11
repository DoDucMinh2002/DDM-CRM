import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Pagination } from "react-bootstrap";
import CustomerForm from "./js/CustomerForm";
import axios from "axios";
import customerStyles from "../customers/scss/Customers.module.scss";
import Head from "../headlast/Head";
import Last from "../headlast/Last";
const Customers = () => {
  // Trạng thái
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const pageSize = 10;
  const [regionFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // Lấy dữ liệu từ API
  useEffect(() => {
    axios
      .get("http://localhost:3001/customers")
      .then((response) => {
        setCustomers(response.data); // Cập nhật danh sách khách hàng
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (regionFilter === "" || customer.region === regionFilter)
  );
  if (customers.length === 0) {
    return <p>Đang tải dữ liệu...</p>;
  }

  const handleSaveCustomer = (customer) => {
    if (selectedCustomer) {
      // Sửa khách hàng
      axios
        .put(
          `http://localhost:3001/customers/${selectedCustomer.id}`,
          customer
        )
        .then((response) => {
          setCustomers((prevCustomers) =>
            prevCustomers.map((c) =>
              c.id === selectedCustomer.id ? response.data : c
            )
          );
          handleCloseModal(); // Đóng modal sau khi lưu
          // Cập nhật thông báo thành công
          setSuccessMessage("Đã thành công!");

          // Xóa thông báo sau 3 giây
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
        });
    } else {
      // Thêm khách hàng
      axios
        .post("http://localhost:3001/customers", customer)
        .then((response) => {
          setCustomers((prevCustomers) => [response.data, ...prevCustomers]);
          handleCloseModal(); // Đóng modal sau khi thêm
          // Cập nhật thông báo thành công
          setSuccessMessage("Đã thành công!");

          // Xóa thông báo sau 3 giây
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error creating customer:", error);
        });
    }
  };

  // Xóa Khách hàng
  const handleDeleteCustomer = (customerId) => {
    axios
      .delete(`http://localhost:3001/customers/${customerId}`)
      .then(() => {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((c) => c.id !== customerId)
        );
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  // Tìm kiếm khách hàng
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Đặt lại trang hiện tại khi tìm kiếm
  };

  // Mở/Đóng Modal
  const handleOpenModal = (customer = null) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#F7F7F7",
      }}
    >
      <Head />
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className={customerStyles.h2}>Quản ký khách hàng</h2>
        {successMessage && (
          <div className={customerStyles.successmessage}>{successMessage}</div>
        )}
      </div>
      <div className={customerStyles.div}>
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
          style={{ marginBottom: "10px", width: "40%" }}
        />
        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
          className={customerStyles.buttonT}
        >
          Thêm Khách hàng
        </Button>
        {/* <Button
          variant="primary"
          onClick={() => handleOpenModal()}
          className={customerStyles.buttonVip}
        >
          Khách hàng Vip
        </Button> */}
      </div>

      <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Table striped hover>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Nơi công tác</th>
              <th>Địa Chỉ</th>
              <th>Ghi chú nếu có</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.workplace}</td>
                <td>{customer.address}</td>
                <td>{customer.ghichu}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleOpenModal(customer)}
                    className={customerStyles.buttonu}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className={customerStyles.buttono}
                  >
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Pagination style={{ justifyContent: "center" }}>
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
        />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
      </Pagination>
      <Last />
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCustomer ? "Sửa Khách hàng" : "Thêm Khách hàng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomerForm
            customer={selectedCustomer}
            onSave={handleSaveCustomer}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Customers;
