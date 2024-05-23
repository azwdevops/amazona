import express from "express";
import User from "../models/userModel";
import expressAsynchandler from "express-async-handler";
import expressAsyncHandler from "express-async-handler";
import { generateToken, requestAuthorized } from "../utils";

const userRoutes = express.Router();

userRoutes.get(
  "/create-admin",
  expressAsyncHandler(async (req, res) => {
    try {
      const adminUser = new User({ name: "admin", email: "admin@email.com", password: "nairobi2024", isAdmin: true });
      const createdUser = await adminUser.save();
      return res.send(createdUser);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  })
);

userRoutes.post(
  "/signin",
  expressAsynchandler(async (req, res) => {
    const signinUser = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!signinUser) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    return res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: generateToken(signinUser),
    });
  })
);
userRoutes.post(
  "/register",
  expressAsynchandler(async (req, res) => {
    const newUser = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
    const createdUser = await newUser.save();
    if (!createdUser) {
      return res.status(401).send({ message: "Invalid user data" });
    }
    return res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);
userRoutes.put(
  "/:id",
  requestAuthorized, // middleware
  expressAsynchandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Invalid user" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    return res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    });
  })
);

export default userRoutes;
