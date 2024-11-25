const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://Ziv:Oriziv12@project.dz2dhdd.mongodb.net/CheaperSal",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB connected`);
  } catch (err) {
    console.error(`Error connecting to MongoDB ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
