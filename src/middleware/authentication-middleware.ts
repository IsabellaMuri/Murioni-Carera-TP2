import { verify, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { db } from "../db/db";

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: "No hay token!" });
    return;
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido.");
  }

  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      res.status(403).json({ error: "Token inválido!" });
      return;
    }

    const user = await db.user.findUnique({ where: { user_id: decoded.id } });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: (error as Error).message });
  }
};

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: "No hay token!" });
    return;
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido.");
  }

  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      res.status(403).json({ error: "Token inválido!" });
      return;
    }
    const user = await db.user.findUnique({ where: { user_id: decoded.id } });
    console.log(user)
    if (!user) {
      res.status(401).json({ error: "Usuario no autenticado" });
      return;
    }

    if (!user.is_admin) {
      res.status(403).json({ error: "Acceso solo para admins" });
      return;
    }
  }
  catch(e) {

  }

  next();
};
