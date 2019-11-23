const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const adminRouter = require("./routes/admin");
const carsRouter = require("./routes/cars");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");

console.log("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

app.use(cors());
// app.use(express.static("build"));
app.use("/carImage", express.static("carImage"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.requestLogger);

app.use("/admin", adminRouter);
app.use("/users", usersRouter);
app.use("/api/cars", carsRouter);
app.use("/api/orders", ordersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
