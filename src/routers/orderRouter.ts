import { Router, Request, Response } from "express";
import { orderService } from "../services/orderService";

const OrderService = new orderService();

export const orderRouter = Router();

orderRouter.get("/", async (_: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();

    res.status(200).json({ ok: true, data: orders });

  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id); 
    const order = await OrderService.getOrderById(orderId);

    res.status(200).json({ ok: true, data: order});

  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

orderRouter.post("/", async (req: Request, res: Response) => {
  try {
      const OrderBody = req.body;
      const table = await OrderService.createOrder(OrderBody);

      res.status(200).json({ ok: true, data: table });

  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

orderRouter.put("/:id", async (req: Request, res: Response) => {
  try {
      const orderBody = req.body;
      const order = await OrderService.updateOrder(orderBody);

      res.status(200).json({ ok: true, data: order });

  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

orderRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
      const orderId = parseInt(req.params.id);
      const order = await OrderService.cancelOrder(orderId);

      res.status(200).json({ ok: true, data: order });

  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});