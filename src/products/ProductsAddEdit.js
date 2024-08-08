import React, { useState } from "react";
import AddEdit from "../products/scss/AddEdit.module.scss";
function ProductsAddEdit({ product, onSave }) {
  const [names, setName] = useState(product ? product.names : "");
  const [code, setCode] = useState(product ? product.code : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [price, setPrice] = useState(product ? product.price : "");
  const [stock, setStock] = useState(product ? product.stock : "");
  const [expiry, setExpiry] = useState(product ? product.expiry : "");
  const [supplier, setSupplier] = useState(product ? product.supplier : "");
  const [image, setImg] = useState(product ? product.image : "");
  const handleSave = () => {
    if (onSave) {
      onSave({ names, code, description, price, stock, expiry, supplier, image }); // Gọi hàm lưu
    }
  };

  return (
    <div className={AddEdit.div}>
      <div style={{ display: "flex" }}>
        <h2 className={AddEdit.h2}>
          {product ? "Chỉnh sửa Sản phẩm" : "Thêm Sản phẩm Mới"}
        </h2>
        <button onClick={handleSave} className={AddEdit.button}>
          <i className="bi bi-save"></i>
        </button>
      </div>
      <div>
        <div className={AddEdit.divTT}>
          <div className={AddEdit.marin}>
            <p>
              <strong className={AddEdit.strong}>Mã sản phẩm:</strong>
              <input
                type="text"
                value={code}
                className="form-control"
                onChange={(e) => setCode(e.target.value)}
                style={{
                  display: "inline-table",
                  marginTop: "10px",
                }}
              />
            </p>
            <p>
              <strong className={AddEdit.strong}>Tên sản phẩm:</strong>
              <input
                type="text"
                value={names}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                style={{
                  display: "inline-table",
                  marginTop: "10px",
                }}
              />
            </p>
            <p>
              <strong className={AddEdit.strong}>Nhà cung cấp:</strong>
              <input
                type="text"
                value={supplier}
                className="form-control"
                onChange={(e) => setSupplier(e.target.value)}
                style={{
                  display: "inline-table",
                  marginTop: "10px",
                }}
              />
            </p>
          </div>
          <div>
            <p>
              <strong className={AddEdit.strong}>Hạn sử dụng:</strong>
              <input
                type="text"
                value={expiry}
                className="form-control"
                onChange={(e) => setExpiry(e.target.value)}
                style={{
                  display: "inline-table",
                  marginTop: "10px",
                }}
              />
            </p>
            <p>
              <strong className={AddEdit.strong}>Giá sản phẩm:</strong>
              <input
                type="number"
                value={price}
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                style={{
                  display: "inline-table",
                  marginTop: "10px",
                }}
              />
            </p>
            <p>
              <strong className={AddEdit.strong}>Số lượng trong kho:</strong>
              <input
                type="number"
                value={stock}
                className="form-control"
                onChange={(e) => setStock(e.target.value)}
                style={{
                  display: "inline-table",
                  marginTop: "10px",
                }}
              />
            </p>
          </div>
        </div>
        <p>
          <strong className={AddEdit.strong}>Đường dẫn tới hình ảnh:</strong>
          <input
            type="text"
            value={image}
            className="form-control"
            onChange={(e) => setImg(e.target.value)}
            style={{
              display: "inline-table",
              marginTop: "10px",
            }}
          />
        </p>
        <p>
          <strong className={AddEdit.strong}>Mô tả:</strong>
          <textarea
            value={description}
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            style={{
              marginTop: "10px",
              height: "127px",
            }}
          />
        </p>
      </div>
    </div>
  );
}

export default ProductsAddEdit;
