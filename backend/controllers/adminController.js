const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateTokens");
const User = require("../models/userModel");

module.exports = {
  getUsers: asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  }),

  getUserById: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (User) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }),

  DeleteUser: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: "User Removed" });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  }),

  UpdateUser: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found!");
    }
  }),

  CreateUser: asyncHandler(async (req, res) => {
    const { name, email, password, pic, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User Already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
      isAdmin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  }),

  BlockUser: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.blocked = req.body.blocked;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        blocked: updatedUser.blocked,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found!");
    }
  }),
};
