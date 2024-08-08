const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

let orders = require("../data/orders.json");
const customers = require("../data/customers.json");
const products = require("../data/products.json");

const writeOrdersToFile = (orders) => {
  fs.writeFileSync(
    path.join(__dirname, "../data/orders.json"),
    JSON.stringify(orders, null, 2)
  );
};

router.get("/", (req, res) => {
  res.json(orders);
});

router.get("/:id", (req, res) => {
  const order = orders.find((o) => o.id == req.params.id);
  if (order) {
    const customer = customers.find((c) => c.id == order.customer);
    const orderProducts = order.products.map((op) => {
      const product = products.find((p) => p.id == op.product_id);
      return {
        ...product,
        quantity: op.quantity,
      };
    });

    res.json({
      ...order,
      customer: customer,
      products: orderProducts,
    });
  } else {
    res.status(404).send("Order not found");
  }
});

router.post("/", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
  };
  orders.push(newOrder);
  writeOrdersToFile(orders);
  res.status(201).json(newOrder);
});

router.put("/:id", (req, res) => {
  const orderIndex = orders.findIndex((o) => o.id == req.params.id);
  if (orderIndex !== -1) {
    const updatedOrder = {
      ...orders[orderIndex],
      ...req.body,
    };
    orders[orderIndex] = updatedOrder;
    writeOrdersToFile(orders);
    res.json(updatedOrder);
  } else {
    res.status(404).send("Order not found");
  }
});

router.delete("/:id", (req, res) => {
  const orderIndex = orders.findIndex((o) => o.id == req.params.id);
  if (orderIndex !== -1) {
    orders = orders.filter((o) => o.id != req.params.id);
    writeOrdersToFile(orders);
    res.status(204).send();
  } else {
    res.status(404).send("Order not found");
  }
});

module.exports = router;
