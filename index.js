// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
require("colors");

const app = express();

app.use(express.json());
app.use(cors());

// ----------- MongoDB ------------
async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!".bgGreen.black);
  } catch (error) {
    console.error("MongoDB is not connected!".bgRed.black, error);
  }
}
connectToDb()
//  --- Routes
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});