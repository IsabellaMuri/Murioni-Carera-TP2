import {  } from "@prisma/client";
//completar

import { db } from "../db/db";

interface OrderBody {
  number: number
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
  async getAllOrders(){
  // Método para obtener todas las órdenes.
    try {
      const order = await db.order.findMany({})
      return order;
    } 
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener las órdenes.")
    }
  }

  async getOrderById(orderNumber: number) {
  // Método para obtener una órden en base a un id específico.
    try {
      const order = await db.order.findMany({
        where: {
          number: orderNumber,
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
      const platesQty = await db.order.plates.count({
        where: {
          id: body.number,
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


      const table = await db.table.create({
        data: body,
      })
      return table;

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
      const order = await db.table.findFirst({
        where: {
          id: body.number,
        }
      })

      if (!order) {
        throw new Error(`No se encontró la mesa con id ${body.number}`)
      }

      const updatedOrder = await db.order.update({
        where: { id: body.number},
        data: body // Modifica la data de la mesa.
      })                                                                                                      

      return updatedOrder;

    } catch (error) {
        console.error("Error actualizando el estado de la órden.")
        console.error(error);
        throw new Error(`Error al actualizar el estado de órden con id ${body.number}.`) 
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
          id: body.number,
        }
      })

      if (!order) {
        throw new Error(`No se encontró la órden con id ${body.number}`)
      }                                                                                                   

      return body.status;

    } catch (error) {
        console.error("Error obteniendo el estado de la órden.")
        console.error(error);
        throw new Error(`Error al obtener el estado de órden con id ${body.number}.`) 
    }
  }
}