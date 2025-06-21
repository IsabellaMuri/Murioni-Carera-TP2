import { Router, Request, Response } from "express";
import { userService } from "../services/userService";
import { isAdminMiddleware, jwtAuthMiddleware } from "../middleware/authentication-middleware";

const UserService = new userService();

export const userRouter = Router();

userRouter.get("/", isAdminMiddleware, async (_: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();

    res.status(200).json({ ok: true, data: users });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

userRouter.get("/email/:email", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const userEmail = req.params.email;
    const user = await UserService.getUserByEmail(userEmail);

    res.status(200).json({ ok: true, data: user });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

userRouter.get("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);

    res.status(200).json({ ok: true, data: user });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

userRouter.delete("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const userId = parseInt(req.params.id);
      const user = await UserService.deleteUser(userId);

      res.status(200).json({ ok: true, data: user });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});