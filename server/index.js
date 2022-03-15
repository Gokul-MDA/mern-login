const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

//Middlewares
app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

//Routes Config
const authRoutes = require("./routes/auth");
const { db } = require("./models/User");
app.use("/api", authRoutes);

//DB Connection
mongoose.connect(process.env.DATABASE, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Db Connected Successfully");
});

//Server Config
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Start On Port ${port}`);
});
