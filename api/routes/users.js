const fs = require("fs");
const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("../data/users.json");
const router = express.Router();
const SECRET_KEY = "your_secret_key";

// Hàm lưu người dùng vào file
const saveUsersToFile = async (users) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, "../data/users.json"),
      JSON.stringify(users, null, 2),
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Route lấy tất cả người dùng
router.get("/", async (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Lỗi lấy dữ liệu người dùng" });
  }
});

// Route lấy người dùng theo ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = users.find((p) => p.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Lỗi lấy dữ liệu người dùng" });
  }
});

// Route đăng nhập
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username và mật khẩu là bắt buộc" });
    }
    const user = users.find((user) => user.username === username);
    if (!user || password !== user.password) {
      return res
        .status(401)
        .json({ error: "Username hoặc mật khẩu không chính xác" });
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ message: "Đăng nhập thành công", token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Lỗi đăng nhập" });
  }
});
router.post("/users", (req, res) => {
  const {
    name,
    ngaysinh,
    email,
    phone,
    diachi,
    trinhdo,
    role,
    img,
    username,
    password,
  } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
  }

  const newEmployee = {
    id: employees.length + 1, // Tạo ID tự động
    name,
    ngaysinh,
    email,
    phone,
    diachi,
    trinhdo,
    role,
    img,
    username,
    password,
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});
// Route cập nhật người dùng
router.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    // console.log(`Updating user with ID: ${userId}`);
    // console.log(`Request body: ${JSON.stringify(req.body)}`);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: "Người dùng không được tìm thấy" });
    }

    // Cập nhật thông tin người dùng
    users[userIndex] = { ...users[userIndex], ...req.body };

    // Lưu vào file
    await saveUsersToFile(users);

    res.status(200).json(users[userIndex]);
  } catch (error) {
    console.error("Lỗi cập nhật người dùng:", error);
    res.status(500).json({ error: "Lỗi cập nhật người dùng" });
  }
});

// Route xóa người dùng
router.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: "Người dùng không được tìm thấy" });
    }

    // Xóa người dùng
    users.splice(userIndex, 1);

    // Lưu vào file
    await saveUsersToFile(users);

    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("Lỗi xóa người dùng:", error);
    res.status(500).json({ error: "Lỗi xóa người dùng" });
  }
});

module.exports = router;
