const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 3,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},{versionKey:false});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
