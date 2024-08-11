const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const customersFilePath = path.join(__dirname, "../data/customers.json");

let customers = require(customersFilePath);

// Helper function to save customers data to file
const saveCustomersToFile = (customers) => {
  fs.writeFileSync(customersFilePath, JSON.stringify(customers, null, 2));
};

// Read all customers
router.get("/", (req, res) => {
  res.json(customers);
});

// Read a single customer by ID
router.get("/:id", (req, res) => {
  const customer = customers.find((c) => c.id == req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).send("Customer not found");
  }
});

// Create a new customer
router.post("/", (req, res) => {
  const newCustomer = {
    id: customers.length ? customers[customers.length - 1].id + 1 : 1,
    ...req.body,
  };
  customers.push(newCustomer);
  saveCustomersToFile(customers);
  res.status(201).json(newCustomer);
});

// Update an existing customer
router.put("/:id", (req, res) => {
  const customerIndex = customers.findIndex((c) => c.id == req.params.id);
  if (customerIndex !== -1) {
    customers[customerIndex] = { id: customers[customerIndex].id, ...req.body };
    saveCustomersToFile(customers);
    res.json(customers[customerIndex]);
  } else {
    res.status(404).send("Customer not found");
  }
});

// Delete a customer
router.delete("/:id", (req, res) => {
  const customerIndex = customers.findIndex((c) => c.id == req.params.id);
  if (customerIndex !== -1) {
    const deletedCustomer = customers.splice(customerIndex, 1);
    saveCustomersToFile(customers);
    res.json(deletedCustomer[0]);
  } else {
    res.status(404).send("Customer not found");
  }
});

module.exports = router;
