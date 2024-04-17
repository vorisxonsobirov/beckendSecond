const User = require("../models/userSchema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const getUser = async (req, res) => {
    try {
        const page = parseInt(req.params.page); // Заменил res на req
        const limit = 10;
        const skip = (page - 1) * limit;
        const totalUsers = await User.countDocuments();

        const AllData = await User.find({},
            "username password firstname lastname phone birthday"
        ).skip(skip).limit(limit);

        if (!AllData) {
            return res.json({
                success: false,
                message: "user not found",
                data: AllData
            })
        }

        const modefireData = AllData.map(user => ({
            ...user._doc
        }));

        return res.json({
            success: true,
            message: "All Users",
            innerData: modefireData,
            currentPage: page,
            totalUsers,
            totalPage: Math.ceil(totalUsers / limit)
        });
    } catch (err) {
        return res.json({
            success: false,
            message: "Server error",
            innerData: err,
        });
    }
};

const signin = async (req, res) => {

    try {
        const { username, password } = req.body;
        console.log(username, password);
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password",
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({
                success: false,
                message: "Invalid username or password",
            });
        }

        const token = jwt.sign({ username: user.username }, "secret")


        return res.json({
            success: true,
            message: "Sign is successful",
            token: token
        });
    } catch (err) {
        return res.json({
            success: false,
            message: "Server error",
            innerData: err,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, password, firstname, lastname, address, age, phone } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password, firstname, lastname, address, age, phone });
            await newUser.save();
            return res.json({ success: true, message: "Registration successful" });
        }
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};



const updateUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const { username, secondname, password, address, age, phone, remember } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { username, secondname, password, address, age, phone, remember },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({
                success: false,
                message: "User not found or not updated!",
            });
        }

        res.json({
            success: true,
            message: "User updated successfully",
            innerData: updatedUser,
        });
    } catch (err) {
        console.log("Error:", err);
        res.json({
            success: false,
            message: "Server error",
        });
    }
};


const deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const deleted = await User.findByIdAndDelete(_id);

        if (!deleted) {
            return res.json({
                success: false,
                message: "User is not deleted!",
            });
        }
        res.json({
            success: true,
            message: "User is deleted!",
            innerData: deleted,
        });
    } catch (err) {
        console.log("Error>>", err);
        res.json({
            success: false,
            message: "Server error",
        });
    }
};




module.exports = {
    getUser,
    signin,
    createUser,
    deleteUser,
    updateUser
};