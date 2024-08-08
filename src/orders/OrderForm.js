import React, { useState, useEffect } from "react";

const OrderForm = ({ order, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    code: "",
    date: "",
    customers: "",
    totalamount: "",
    status: "",
    products: [], // Initialize products as an empty array
  });

  useEffect(() => {
    if (order) {
      setFormData({
        code: order.code,
        date: order.date,
        customers: order.customers,
        totalamount: order.totalamount,
        status: order.status,
        products: order.products || [], // Ensure products is an array
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = formData.products.map((product, i) =>
      i === index ? { ...product, [key]: value } : product
    );
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { productName: "", quantity: 0 }],
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call onSave with form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Mã Đơn hàng</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div>
        <label>Ngày</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div>
        <label>Khách hàng</label>
        {/* <div>{formData.customers}</div> */}
        <input
          type="text"
          name="customers"
          value={formData.customers}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div>
        <label>Sản phẩm</label>
        <table className="table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formData.products.map((product, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={product.productName}
                    onChange={(e) =>
                      handleProductChange(index, "productName", e.target.value)
                    }
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "quantity",
                        parseInt(e.target.value)
                      )
                    }
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={handleAddProduct}
          className="btn btn-secondary"
        >
          Thêm sản phẩm
        </button>
      </div>
      <div>
        <label>Tổng</label>
        <input
          type="number"
          name="totalamount"
          value={formData.totalamount}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div>
        <label>Trạng thái</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="" disabled>
            Chọn trạng thái
          </option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
