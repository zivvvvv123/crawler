const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");
const Product = require("../models/schema");

const deleteData = async () => {
  await connectDB();
  try {
    await Product.deleteMany({ supermarket_id: "6679be2c57012929c3130e58" });
    console.log("deleted!");
    process.exit();
  } catch {
    console.log(error);
    process.exit(1);
  }
};
deleteData();
