const path = require("path");

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config(".env");

const ApiError = require("./utils/apiError");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");

//routes
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");

// db connection
dbConnection();

// express app
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.Node_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`env ${process.env.Node_ENV}`);
}

//routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

// handle undefined routes
app.all("*", (req, res, next) => {
  // const error = new Error(`can't find this route ${req.originalUrl}`);
  next(new ApiError(`can't find this route ${req.originalUrl}`, 400));
});

// global error handler middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//@desc    handle UnhandledRejection outside express
//@errType Asynchronous errors
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledErrors => ${err}`);
  server.close(() => {
    //close server from accept new req and complete the pending req
    console.log("Shitting Server down ....  ");
    process.exit(1); // it immediately stops the execution of your Node.js application
  });
});
