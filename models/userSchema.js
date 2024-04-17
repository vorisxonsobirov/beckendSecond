const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  address: { type: String, require: true },
  secondname: { type: String, require: true },
  phone: { type: Number },
  age: { type: Number, require: true },
});
const UserModel = model("users", userSchema);
module.exports = UserModel;       