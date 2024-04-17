// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use(cors());

// ----------- MongoDB ------------
async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
connectToDb();

//  --- Routes
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});