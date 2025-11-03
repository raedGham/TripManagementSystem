const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");
const userRoute = require("./routes/userRoutes");
const clientRoute = require("./routes/clientRoutes");
const tableRoute = require("./routes/tableRoutes");
const categoriesRoute = require("./routes/categoriesRoutes");
const productsRoute = require("./routes/productRoutes");
const invoiceRoute = require("./routes/invoiceRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");

const crypto = require("crypto");
const fs = require("fs");

const app = express();
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("uploads", express.static(path.join(__dirname, "uploads")));

//Error Middleware
app.use(errorHandler);

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/clients", clientRoute);
app.use("/api/tables", tableRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/products", productsRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/dashboard", dashboardRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server Running on port ${PORT}`);
    })
  )
  .catch((err) => console.log("ERROR MONGODB ", err));
