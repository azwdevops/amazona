import express from "express";
import { requestAuthorized } from "../utils";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";

const orderRoutes = express.Router();

orderRoutes.get(
  "/my-orders",
  requestAuthorized,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    return res.send(orders);
  })
);

orderRoutes.get(
  "/:id",
  requestAuthorized,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    return res.send(order);
  })
);

orderRoutes.post(
  "/place-order",
  requestAuthorized,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New order created", order: createdOrder });
  })
);

orderRoutes.put(
  "/:id/pay",
  requestAuthorized,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payment.paymentResult = {
        payerID: req.body.payerID,
        paymentID: req.body.paymentID,
        orderID: req.body.orderID,
      };
      const updatedOrder = await order.save();
      return res.send({ message: "Order paid", order: updatedOrder });
    } else {
      return res.status(404).send({ message: "Order not found" });
    }
  })
);

export default orderRoutes;
