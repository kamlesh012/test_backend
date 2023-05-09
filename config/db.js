const mongoose = require("mongoose");
// test.js

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    });
    // console.log(process.env.MONGO_URI);
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
    // console.log(`${mongoose.connection.readyState}`);
  } catch (error) {
    console.log(`Error is ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
