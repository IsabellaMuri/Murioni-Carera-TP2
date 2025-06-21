import { Router, Request, Response } from "express"
import { userService } from "../services/userService";
import { jwtAuthMiddleware } from "../middleware/authentication-middleware";

const UserService = new userService();

export const registerRouter = Router();

registerRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userFromRequest = req.body;
    const userCreated = await userService.createUser(userFromRequest);
    res.status(201).json({ data: userCreated });
  } catch (error) {
    res.status(500).json({ error: (error as any).message })
  }
});