import "dotenv/config";
import express from "express";
import cors from "cors";

import data from "./data.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((item) => item._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

app.use((err, req, res, next) => {
  const status = err?.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

mongoose
  .connect(`${process.env.MONGO_DB_URL}`)
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected to mongo and serving at http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log(err.reason);
  });
