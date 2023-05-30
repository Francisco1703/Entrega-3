const express = require("express");
const PORT = 8080;
const app = express();
const { ProductManager } = require("./productManager");

const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const productsList = await productManager.getProducts();
    if (limit) {
      let arrayProds = [...productsList];
      const productsLimit = arrayProds.slice(0, limit);
      return res.send(productsLimit);
    } else {
      res.json(productsList);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const idProduct = req.params.id;
    const products = await productManager.getProducts();
    const existProduct = products.find((prod) => prod.id == idProduct);
    const response = existProduct
      ? existProduct
      : {
          error: `No se encuentra el producto con el id ${idProduct} en nuestra base de datos`,
        };
    res.status(existProduct ? 200 : 400).send(response);
  } catch (error) {
    console.log(error);
  }
});

//app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
