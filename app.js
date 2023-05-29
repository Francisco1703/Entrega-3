const express = require("express");
const PORT = 3000;
const app = express();
const { ProductManager, readProducts } = require("./productManager");
const productManager = new ProductManager();
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.get("/products", async (req, res) => {
  try {
    let productsList = await productManager.getProducts();
    res.json(productsList);
  } catch (error) {
    console.log(error);
  }
});
