import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Pagination, Col, Row } from "react-bootstrap";
import OrderForm from "../orders/js/OrderForm";
import axios from "axios";
import ordersStyles from "../orders/scss/Orders.module.scss";
import customerStyles from "../customers/scss/Customers.module.scss";
import Head from "../headlast/Head";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("import");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3001/orders") // Cập nhật URL API
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const handleOpenModal = (order = null) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSaveOrder = (order) => {
    if (selectedOrder) {
      axios
        .put(`http://localhost:3001/orders/${selectedOrder.id}`, order) // Cập nhật URL API
        .then((response) => {
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o.id === selectedOrder.id ? response.data : o
            )
          );
          handleCloseModal();
          setSuccessMessage("Đã thành công!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error updating order:", error);
        });
    } else {
      axios
        .post("http://localhost:3001/orders", order) // Cập nhật URL API
        .then((response) => {
          setOrders((prevOrders) => [response.data, ...prevOrders]);
          handleCloseModal();
          setSuccessMessage("Đã thành công!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error creating order:", error);
        });
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      axios
        .delete(`http://localhost:3001/orders/${orderId}`) // Cập nhật URL API
        .then(() => {
          setOrders((prevOrders) => prevOrders.filter((o) => o.id !== orderId));
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    }
  };

  const handleOrderTypeChange = (type) => {
    setSelectedOrderType(type);
  };

  // Lọc đơn hàng theo loại đơn hàng
  const filteredOrders = orders.filter(
    (order) => order.ordertype === selectedOrderType
  );

  // Lọc tiếp theo tên khách hàng
  const searchedOrders = filteredOrders.filter((order) => {
    const customerName = order.customers || "";
    return customerName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Phân trang
  const currentOrders = searchedOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(searchedOrders.length / pageSize);

  return (
    <div className={ordersStyles.ordersContainer}>
      <Head />
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className={ordersStyles.pageTitle}>Quản lý đơn hàng</h2>
        {successMessage && (
          <div className={ordersStyles.successmessage}>{successMessage}</div>
        )}
      </div>
      <Row style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Col xs={8}>
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
            style={{ width: "80%", marginBottom: "10px" }}
          />
        </Col>
        <Col xs={4}>
          <Button
            variant="primary"
            onClick={() => handleOpenModal()}
            className={ordersStyles.buttonT}
          >
            Thêm Đơn hàng
          </Button>
        </Col>
      </Row>
      <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <div>
          <button
            className={ordersStyles.buttonKH}
            onClick={() => handleOrderTypeChange("Đơn hàng nhập kho")}
            style={{
              backgroundColor:
                selectedOrderType === "Đơn hàng nhập kho"
                  ? "aliceblue"
                  : "#6c757d",
            }}
          >
            Đơn hàng nhập kho
          </button>
          <button
            className={ordersStyles.buttonNsx}
            onClick={() => handleOrderTypeChange("Đơn hàng bán lẻ")}
            style={{
              backgroundColor:
                selectedOrderType === "Đơn hàng bán lẻ"
                  ? "aliceblue"
                  : "#6c757d",
            }}
          >
            Đơn hàng bán lẻ
          </button>
        </div>

        <Table striped hover>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Ngày</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.code}</td>
                <td>{order.date}</td>
                <td>{order.customers}</td>
                <td>{order.totalamount} VND</td>
                <td>{order.status}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleOpenModal(order)}
                    className={customerStyles.buttonu}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteOrder(order.id)}
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

      {/* Phân trang */}
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
      <div className={ordersStyles.last}>CRM@DDM</div>

      {/* Modal cho form thêm/sửa đơn hàng */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedOrder
              ? "Sửa đơn hàng và hiển thị chi tiết"
              : "Thêm đơn hàng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderForm order={selectedOrder} onSave={handleSaveOrder} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Orders;
