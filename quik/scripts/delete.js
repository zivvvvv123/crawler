const fs = require("fs");
const path = require("path");
const connectDB = require("../config/db");
const Product = require("../models/schema");

const deleteData = async () => {
  await connectDB();
  try {
    await Product.deleteMany({ supermarket_id: "66973258ad578935d990c2f0" });
    console.log("deleted!");
    process.exit();
  } catch {
    console.log(error);
    process.exit(1);
  }
};
deleteData();
