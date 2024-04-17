
const express = require("express");
const router = express.Router();
const { getUser, signin, createUser, updateUser, deleteUser } = require("../controllers/users");

router.get("/getUsers/:page", getUser);
router.post("/signin", signin);
router.post("/createUser", createUser);
router.put("/updateUser/:_id", updateUser);
router.delete('/deleteUser/:_id', deleteUser);


module.exports = router;

