import { Order } from "@prisma/client";
import { db } from "../db/db";
import { userService } from "../services/userService"
import { plateService } from "../services/plateService"

export class orderService { 
  async getAllOrders() {
    // Método para obtener todas las mesas definidas en la db.
    try {
        const orders = await db.order.findMany({})
        
        return orders

      }
      catch (error) {
        console.error(error);
        throw new Error("Error al obtener las mesas.")
      }
  }

  static calculateDiscount(cantidadPlatos: number): number {
    // Método para calcular el descuento a aplicar según la cantidad de platos.
    if (cantidadPlatos > 7) {
      return 0.5;
    }
    if (cantidadPlatos > 5) {
      return 0.2;
    }
    if (cantidadPlatos > 3) {
      return 0.1;
    }
    return 0;
  }

  static calculateTotalAmount(subtotal: number, discount : number) {
    // Método para calcular el monto total de la orden.
    return subtotal - subtotal * discount;
  }

  static async createOrder({userId, plates}: {userId: number; plates: { plateId: number; quantity: number }[];}) {
    // Método para crear una nueva orden.
    try {
      const user = await userService.getUserById(userId)

      if (!user) {
        throw new Error(`No existe el usuario con id ${userId}`)
      }
      
      if (!Array.isArray(plates) || plates.length === 0) {
        throw new Error("La orden debe tener al menos un plato.")
      }

      const platesData = await Promise.all(
        plates.map(async ({ plateId }) => {
          const plate = await plateService.getPlateById(plateId);
          if (!plate) {
            throw new Error(`No existe el plato con id ${plateId}`);
          }
          return plate;
        })
      );

      let subtotal = 0;
      let platesCounter = 0;

      plates.forEach(({ plateId, quantity }) => {
        const plate = platesData.find(p => p.plate_id === plateId)!;
        subtotal += plate.price * quantity;
        platesCounter += quantity;
      });

      const discount = this.calculateDiscount(platesCounter);
      const total = this.calculateTotalAmount(subtotal, discount);

      const platesList: string[] = [];
      plates.forEach(({ plateId, quantity }) => {
        const plate = platesData.find(p => p.plate_id === plateId)!;
        for (let i = 0; i < quantity; i++) {
          platesList.push(plate.name);
        }
      });

      const newOrder = await db.order.create({
        data: {
          order_client: userId,
          status: "Pendiente",
          plates: JSON.stringify(platesList),
          deliver_address: user.address,
          subtotal: subtotal,
          discount: discount,
          total: total
        }
      })

      for (const { plateId, quantity } of plates) {
        for (let i = 0; i < quantity; i++) {
          await db.orderPlate.create({
            data: {
              order_id: newOrder.order_id,
              plate_id: plateId
            }
          });
        }
      }
  
      return newOrder;

    }
    catch (error) {
      console.error(error);
      throw new Error("Error al crear orden.");
    }
  }

  async updateOrder(body: Order) {
    // Método para actualizar la orden.
    try {
      const existingOrder = await db.order.findFirst({
        where: { 
          order_id: body.order_id 
        }
      })

      if (!existingOrder) {
        throw new Error(`No se encontró la orden con id ${body.order_id}`);
      }

      const updatedOrder = await db.order.update({
        where: { 
          order_id: body.order_id 
        },
        data: {
          order_client: body.order_client,
          status: body.status,
          plates: body.plates,
          deliver_address: body.deliver_address
        }
      })

      return updatedOrder
    }
    catch (error) {
      console.error(error);
      throw new Error(`Error al actualizar la orden con id ${body.order_id}.`);
    }
  }

  async cancelOrder(orderId: number) {
    // Método para cancelar una orden con un ID específico.
    try {
      const order = await db.order.delete({
        where: {
          order_id: orderId
        }
      })

      if (!order) {
        throw new Error(`No se encontró la mesa con id ${orderId}`);
      }

      return order
    }
    catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar la orden con id ${orderId}.`);
    }
  }
}