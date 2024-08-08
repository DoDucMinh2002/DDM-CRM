import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Productss from "../products/scss/products.module.scss";
import Modalproduct from "./Modalproduct";
import ProductsAddEdit from "./ProductsAddEdit";
import Head from "../headlast/Head";
import Last from "../headlast/Last";
// import { Prev } from "react-bootstrap/esm/PageItem";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    if (!showModal) {
      fetchProducts(); // Tải lại danh sách sản phẩm khi modal đóng
    }
  }, [showModal]);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const filteredProducts = products.filter((product) =>
    product.names?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleOpenModal = async (productId) => {
    if (productId) {
      // Chỉ lấy dữ liệu khi chỉnh sửa
      try {
        const response = await axios.get(
          `http://localhost:3001/products/${productId}`
        );
        setSelectedProducts(response.data); // Đặt sản phẩm được chọn
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    } else {
      setSelectedProducts(null); // Nếu là thêm mới, không có sản phẩm
    }
    setShowModal(true); // Mở modal
  };

  const handleSaveProduct = async (product) => {
    try {
      if (selectedProducts) {
        await axios.put(
          `http://localhost:3001/products/${selectedProducts.id}`,
          product
        );
      } else {
        await axios.post("http://localhost:3001/products", product);
      }
      setShowModal(false); // Đóng modal sau khi lưu
      setSelectedProducts(null); // Đặt lại sản phẩm được chọn
      fetchProducts();
      setSuccessMessage("Đã thành công!");

      // Xóa thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      if (error.response) {

        console.error("Lỗi khi lưu sản phẩm:", error.response.data);
      } else {
        console.error("Lỗi khác:", error.message);
      }
    }
  };

  //delete
  const handleDeleteProduct = (productID) => {
    axios
      .delete(`http://localhost:3001/products/${productID}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productID)
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  // Đóng Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProducts(null); // Đặt lại sản phẩm được chọn
  };
  const navigate = useNavigate();
  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className={Productss.div}>
      <Head />
      <div style={{ display: "flex", alignItems: "center", marginTop:'58px' }}>
        <h1 className={Productss.h1}>Quản lý sản phẩm</h1>
        {successMessage && (
          <div className={Productss.successmessage}>{successMessage}</div>
        )}
      </div>
      <div className={Productss.divIB}>
        <input
          className="form-control"
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "50%" }}
        />
        <button
          onClick={() => handleOpenModal(null)}
          className={Productss.buttonT}
        >
          Thêm sản phẩm mới
        </button>
      </div>
      <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
        <Table striped hover>
          <thead style={{ fontSize: "18px" }}>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>SLTK</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.code}</td>
                <td>{product.names}</td>
                <td>{product.price} VNĐ</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className={Productss.buttonU}
                    onClick={() => handleOpenModal(product.id)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className={Productss.buttonO}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                  <button
                    className={Productss.buttonCT}
                    onClick={() => viewProductDetails(product.id)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
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
      {/* Modal để hiển thị chi tiết sản phẩm */}
      <Modalproduct show={showModal} onClose={handleCloseModal}>
        <ProductsAddEdit
          product={selectedProducts} // Sản phẩm được chọn
          onSave={handleSaveProduct} // Hàm lưu sản phẩm
        />
      </Modalproduct>
    </div>
  );
};

export default Products;
