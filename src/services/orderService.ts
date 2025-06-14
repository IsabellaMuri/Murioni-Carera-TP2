import { Order } from "@prisma/client";
//completar

import { db } from "../db/db";

interface OrderBody {
  order_id: number
  client_order: number
  status: string
  plates: string[]
  deliver_adress: string
}
/*
el orderbody no contiene el descuento y total 
xq cuando el usuario crea un pedido este no ingresa en si el total
el descuento y total lo calculas desde adentro

crear una order -> anted d crearla adentro del database
- primero calculas el descuento (corte usas el metodo de applydiscount)
  - discount = this.applydiscount(pedidos no c)
- dsp calculas el total con el metodo cso total
-por ultimo creas el pedido mandandole el body y el descuento+total
*/

export class orderService{ 
  async getAllOrders() {
  // Método para obtener todas las mesas definidas en la db.
  try {
      const order = await db.order.findMany({})
      return order;
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener las mesas.")
    }
  }

  async getOrderById(orderNumber: number) {
  // Método para obtener una órden en base a un id específico.
    try {
      const order = await db.order.findMany({
        where: {
          order_id: orderNumber,
        }
      })
      return order;
    } 
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener la órden con número")
    }
  }

  async applyDiscount(body: OrderBody) {
  // Método para aplicar los descuentos según la cantidad de platos en la órden.
    try {
      const platesQty = await db.order.count({
        where: {
          order_id: body.order_id,
        }
      })
    }
    catch(error) {
      console.error(error);
      throw new Error("Error al aplicar descuento.")
    }
  }

  calculateTotalAmount() {
  // Método para calcular el monto total de la órden.

  }

  async createOrder(body: OrderBody) {
  // Método para crear una nueva órden.
    try {
      const order = await db.order.create({
        data: body,
      })

      return order;
    } 
    catch (error) {
      console.error("Error creando la órden: ", body)
      console.error(error);
      throw new Error("Error al crear órden.")
    }
  }

  async updateOrder(body: OrderBody) {
  // Método para actualizar la órden.
    try {
      const order = await db.order.findFirst({
        where: {
          order_id: body.order_id,
        }
      })

      if (!order) {
        throw new Error(`No se encontró la mesa con id ${body.order_id}`)
      }

      const updatedOrder = await db.order.update({
        where: { order_id: body.order_id},
        data: body // Modifica la data de la mesa.
      })                                                                                                      

      return updatedOrder;

    } catch (error) {
        console.error("Error actualizando el estado de la órden.")
        console.error(error);
        throw new Error(`Error al actualizar el estado de órden con id ${body.order_id}.`) 
    }
  }

  /* async cancelOrder(orderNumber: number) {
  // Método para cancelar una órden.
    
  } */

  async getStatus(body: OrderBody) {
  // Método para obtener el estado de la órden.
    try {
      const order = await db.order.findFirst({
        where: {
          order_id: body.order_id,
        }
      })

      if (!order) {
        throw new Error(`No se encontró la órden con id ${body.order_id}`)
      }                                                                                                   

      return body.status;

    } catch (error) {
        console.error("Error obteniendo el estado de la órden.")
        console.error(error);
        throw new Error(`Error al obtener el estado de órden con id ${body.order_id}.`) 
    }
  }
}