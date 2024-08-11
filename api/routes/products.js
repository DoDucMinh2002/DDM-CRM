const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/products.json");

let products = [];

const loadProductsFromFile = async () => {
  try {
    const data = await fs.readFile(productsFilePath, "utf8");
    products = JSON.parse(data);
  } catch (error) {
    console.error("Error reading products file:", error);
    products = [];
  }
};

const saveProductsToFile = async (data) => {
  try {
    await fs.writeFile(productsFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to products file:", error);
  }
};

loadProductsFromFile();

// Get all products
router.get("/", (req, res) => {
  res.json(products);
});

// Get product by ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

// Create new product
router.post("/", async (req, res) => {
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    ...req.body,
  };
  products.push(newProduct);
  await saveProductsToFile(products);
  res.status(201).json(newProduct);
});

// Update product by ID
router.put("/:id", async (req, res) => {
  const productIndex = products.findIndex((p) => p.id == req.params.id);
  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    await saveProductsToFile(products);
    res.json(updatedProduct);
  } else {
    res.status(404).send("Product not found");
  }
});

// Delete product by ID
router.delete("/:id", async (req, res) => {
  const productIndex = products.findIndex((p) => p.id == req.params.id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    await saveProductsToFile(products);
    res.status(204).send();
  } else {
    res.status(404).send("Product not found");
  }
});

module.exports = router;
