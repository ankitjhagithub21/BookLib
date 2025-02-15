const UserModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  if(username.trim().length <3){
    return res
      .status(400)
      .json({ success: false, message: "Username must be atleast 3 characters long." });

  }
  try {
    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist." });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter valid email address." });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter strong password." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    if (savedUser) {
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SEC, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  try {
    const emailExist = await UserModel.findOne({ email });

    if (!emailExist) {
      return res
        .status(400)
        .json({ success: false, message: "User not exist." });
    }

    const isValidPassword = await bcrypt.compare(password, emailExist.password);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong email or password." });
    }

    const token = jwt.sign({ id: emailExist._id }, process.env.JWT_SEC, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user: {
        _id: emailExist._id,
        username: emailExist.username,
        email: emailExist.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    

    return res.cookie("token","",{
      httpOnly:true,
      secure:true,
      sameSite:"strict",
      maxAge:0
    }).json({ success: true, message:"Logged out successfully." });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  signup,
  login,
  getUser,
  logoutUser
};
