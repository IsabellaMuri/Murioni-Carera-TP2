import { sign, verify, JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";
import { db } from "../db/db";

export class JwtService {
  async generateJsonWebAccessToken(user: User) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET no está definido.");
    
    try {
      const token = sign(
        { id: user.user_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return token;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al generar token JWT.`);
    }
  }

  async generateJsonWebRefreshToken(user: User) {
    if (!process.env.JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET no está definido.");
    
    try {
      const token = sign(
        { id: user.user_id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '30d' }
      );
      return token;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al generar refresh token.`);
    }
  }

  async generateJsonWebAccessTokenFromRefreshToken(refreshToken: string) {
    if (!process.env.JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET no está definido.");
    
    try {
      const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET) as JwtPayload;

      if (!decoded || typeof decoded !== "object" || !decoded.id) {
        throw new Error("Refresh token inválido.");
      }

      const user = await db.user.findUnique({
        where: { user_id: decoded.id }
      });

      if (!user) {
        throw new Error("Usuario no encontrado.");
      }

      const newAccessToken = await this.generateJsonWebAccessToken(user);
      return { accessToken: newAccessToken };
    } catch (error) {
      console.error(error);
      throw new Error("Error al refrescar token.");
    }
  }
}
