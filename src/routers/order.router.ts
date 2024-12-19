import { Router } from "express";
import asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constent/order_status";
import auth from "../middleware/auth.mid";

const router = Router();

// Apply middleware to all routes
router.use(auth);

router.post(
  "/create",
  asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;

    

    if (requestOrder.items.length <= 0) {
      res.status(400).send("Cart is empty!");
      return;
    }
    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);

    

  })
);

export default router;
