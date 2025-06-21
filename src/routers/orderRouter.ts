import { Router, Request, Response } from "express";
import { orderService } from "../services/orderService";
import { isAdminMiddleware, jwtAuthMiddleware } from "../middleware/authentication-middleware";

const OrderService = new orderService();

export const orderRouter = Router();

orderRouter.get("/", isAdminMiddleware, async (_: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();

    res.status(200).json({ ok: true, data: orders });

  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

orderRouter.post("/", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId, plates } = req.body;

    const newOrder = await orderService.createOrder({ userId, plates });

    res.status(201).json({ ok: true, data: newOrder });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

orderRouter.put("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const orderBody = req.body;
      const order = await OrderService.updateOrder(orderBody);

      res.status(200).json({ ok: true, data: order });

  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

orderRouter.delete("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const orderId = parseInt(req.params.id);
      const order = await OrderService.cancelOrder(orderId);

      res.status(200).json({ ok: true, data: order });

  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});