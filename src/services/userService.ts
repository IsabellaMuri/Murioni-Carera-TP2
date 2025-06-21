import { User } from "@prisma/client";
import { db } from "../db/db";
import { hash } from 'bcrypt'

interface UserBody {
  name: string
  email: string
  phone: number
  password: string
  address: string
}

export class userService {
  async getAllUsers() {
    // Método para obtener a todos los usuarios.
    try {
      const users = await db.user.findMany({})

      return users
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener los usuarios.")
    }
  }

  static async getUserById(userId: number) {
    // Método para obtener un usuario con un ID específico.
    try {
      const user = await db.user.findUnique({
        where: {
          user_id: userId
        }
      })

      if (!user) {
        throw new Error(`No existe el usuario con id ${userId}`)
      }

      return user
    }
    catch (error) {
      console.error(error)
      throw new Error(`Error al obtener el usuario con id ${userId}`)
    }
  }

  async getUserByEmail(email: string) {
    // Método para obtener un usuario por mail.
    try {
      const user = await db.user.findFirst({
        where: {
          email
        }
      })

      if (!user) {
        throw new Error(`No existe el usuario.`)
      }

      return user
    }
    catch (error) {
      console.error(error);
      throw new Error(`Error al obtener usuario.`)
    }
  }

  static async createUser(body: UserBody) {
    // Método para crear un usuario nuevo.
    try {
      const existingUser = await db.user.findUnique({
        where: { email: body.email }
        })

      if (existingUser) {
        throw new Error(`El usuario ya está registrado.`)
      }

      const user = await db.user.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          password: await hash(body.password, 10),
          address: body.address
        }
      })

      return user
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear usuario")
    }
  }

  async updateUser(body: User) {
    // Método para actualizar un usuario.
    try {
      const existingUser = await db.user.findFirst({
        where: {
          user_id: body.user_id
        }
      })

      if (!existingUser) {
        throw new Error("El usuario no existe")
      }

      const updatedUser = await db.user.update({
        where: {
          user_id: body.user_id
        },
        data: body
      })

      return updatedUser
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el usuario")
    }
  }

  async deleteUser(userId: number) {
    // Método para eliminar a un usuario.
    try {
      const existingUser = await db.user.findFirst({
        where: {
          user_id: userId
        }
      })

      if (!existingUser) {
        throw new Error("El usuario no existe")
      }

      const deletedUser = await db.user.delete({
        where: {
          user_id: userId
        }
      })

      return deletedUser
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el usuario.")
    }
  }
}
