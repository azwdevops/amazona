import express from "express";
import User from "../models/userModel";
import expressAsynchandler from "express-async-handler";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils";

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

export default userRoutes;
