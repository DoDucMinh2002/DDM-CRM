import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Cousto from "../scss/Customers.module.scss";

function CustomerForm({ customer, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    ghichu: "",
    workplace:"",
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="customerName">
        <Form.Label column sm={2} className={Cousto.botom}>
          Tên:
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: "300px" }}
            placeholder="Nhập tên khách hàng"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="customerEmail">
        <Form.Label column sm={2} className={Cousto.botom}>
          Email:
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ width: "300px" }}
            placeholder="Nhập email khách hàng"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="customerPhone">
        <Form.Label column sm={2} className={Cousto.botom}>
          Điện thoại:
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="Nhập số điện thoại khách hàng"
            style={{ width: "300px" }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="customerPhone">
        <Form.Label column sm={2} className={Cousto.botom}>
          Nơi công tác:
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="text"
            name="workplace"
            value={formData.workplace}
            onChange={handleInputChange}
            required
            placeholder="workplace"
            style={{ width: "300px" }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="customerPhone">
        <Form.Label column sm={2} className={Cousto.botom}>
          Dia chi:
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="Dia chi khách hàng"
            style={{ width: "300px" }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="customerPhone">
        <Form.Label column sm={2} className={Cousto.botom}>
          Ghi chú:
        </Form.Label>
        <Col sm={3}>
          <Form.Control
            type="text"
            name="ghichu"
            value={formData.ghichu}
            onChange={handleInputChange}
            required
            placeholder="Ghi chú"
            style={{ width: "300px" }}
          />
        </Col>
      </Form.Group>
      <Row>
        <Col sm={2}></Col>
        <Col sm={10}>
          <Button type="submit">Lưu</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default CustomerForm;
