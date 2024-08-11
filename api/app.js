const express = require("express");
const app = express();
const cors = require("cors");

const customersRouter = require("./routes/customers");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");

app.use(
  cors({
    origin: " http://localhost:3000",
  })
);
app.use(express.json());

// Cấu hình route
app.use("/customers", customersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter); // Sử dụng route đã cấu hình

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
