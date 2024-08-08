import React, { useState, useEffect } from "react"; // Sử dụng useState và useEffect
import { useParams,Link } from "react-router-dom";
import axios from "axios"; // Sử dụng axios để gọi API
import Productsdetail from "../products/scss/ProductDetails.module.scss";
const ProductDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null); // Biến để lưu trữ thông tin sản phẩm
  const [error, setError] = useState(null); // Biến để lưu trữ lỗi (nếu có)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Gọi API để lấy thông tin sản phẩm dựa trên ID
        const response = await axios.get(
          `http://localhost:3001/products/${id}`
        );
        setProduct(response.data); // Lưu trữ thông tin sản phẩm
      } catch (error) {
        // Nếu có lỗi, lưu trữ thông báo lỗi
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        setError("Không thể lấy thông tin sản phẩm");
      }
    };

    fetchProduct(); // Gọi hàm để lấy dữ liệu
  }, [id]); // Chỉ gọi lại khi ID thay đổi

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi nếu có
  }

  if (!product) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị thông báo khi đang chờ dữ liệu
  }

  return (
    <div className={Productsdetail.div}>
      <div className={Productsdetail.divn}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex" }}>
            <h2>
              <strong>Chi tiết Sản phẩm: </strong>
            </h2>
            <Link to="/products" className={Productsdetail.button}>
              <i class="bi bi-arrow-90deg-left"></i>
            </Link>
          </div>
          <div className={Productsdetail.divSP}>
            <div style={{ borderRight: "4px solid black" }}>
              <img
                src={product.image}
                alt={product.names}
                width="300"
                height="400"
                className={Productsdetail.img}
              />
            </div>
            <div className={Productsdetail.divTT}>
              <p>
                <strong>Mã sản phẩm :</strong> {product.code}
              </p>
              <p>
                <strong>Tên sản phẩm :</strong> {product.names}
              </p>
              <p>
                <strong>Hạn sử dụng :</strong> {product.expiry}
              </p>
              <p>
                <strong>Nhà cung cấp :</strong> {product.supplier}
              </p>
              <p>
                <strong>Mô tả :</strong> {product.description}
              </p>
              <p>
                <strong>Giá :</strong> {product.price} VNĐ
              </p>
              <p>
                <strong>Số lượng trong kho :</strong> {product.stock}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
