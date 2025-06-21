import { Plate } from "@prisma/client";
import { db } from "../db/db";

interface plateBody {
  name: string
  description: string
  price: number
  category: string
}

export class plateService {
  async getAllPlates(){
    // Método para obtener todos los platos.
    try {
      const plates = await db.plate.findMany({})

      return plates
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener los platos.")
    }
  }

  static async getPlateById(plateId: number){
    // Método para obtener un plato con un ID específico.
    try {
      const plate = await db.plate.findUnique({
        where: {
          plate_id: plateId
        }
      })

      if (!plate) {
        throw new Error(`No existe un plato con id ${plateId}`)
      }

      return plate
    }
    catch (error) {
      console.error(error);
      throw new Error(`Error al obtener el plato con id ${plateId}`)
    }
  }

  async getPlatesByCategory(category: string) {
    // Método para obtener un plato plato con una categoría específica.
    try {
      const plate = await db.plate.findMany({
        where: {
          category
        }
      })

      return plate
    }
    catch (error) {
      console.error(error);
      throw new Error(`Error al obtener el plato.`)
    }
  }

  async createPlate(body: plateBody) {
    // Método para crear un nuevo plato.
    try {
      const plate = await db.plate.create({
        data: {
          name: body.name,
          description: body.description,
          price: body.price,
          category: body.category
        }
      })

      return plate
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al crear plato.")
    }
  }

  async updatePrice(plateId: number, price: number) {
    // Método para actualizar el precio de un plato.
    try {
      const plate = await db.plate.findFirst({
        where: { 
          plate_id: plateId 
        }
      })

      if (!plate) {
        throw new Error(`No se encontró el plato con id ${plateId}`);
      }

      const updatedPlate = await db.plate.update({
        where: { 
          plate_id: plateId
        },
        data: {
          price: price
        }
      })

      return updatedPlate
    }
    catch (error) {
      console.error("Error actualizando el precio del plato.");
      console.error(error);
      throw new Error(`Error al actualizar el precio del plato con id ${plateId}.`);
    }
  }

  async deletePlate(plateId: number) {
    // Método para eliminar un plato con un ID específico.
    try {
        const plate = await db.plate.delete({
          where: {
            plate_id: plateId
          }
        })

        if (!plate) {
          throw new Error(`No se encontró el plato con id ${plateId}`);
        }

        return plate
    }
    catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar el plato con id ${plateId}.`);
    }
  }
}