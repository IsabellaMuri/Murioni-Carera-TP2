import { Order } from "@prisma/client";
import { db } from "../db/db";

interface OrderBody {
  order_id: number
  order_client: number
  status: string
  plates: string
  deliver_address: string
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
      
      return order.map(order => ({
      ...order,
      plates: JSON.parse(order.plates),
    }));

    }
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener las mesas.")
    }
  }

  async getOrderById(orderId: number) : Promise<Omit<Order, 'plates'> & { plates: string[] } | null> {
  // Método para obtener una órden en base a un id específico.
    try {
      const order = await db.order.findUnique({
        where: { 
          order_id: orderId 
        },
      });

    if (!order) return null;

    return {
      ...order,
      plates: JSON.parse(order.plates),
    };

    } 
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener la órden con número")
    }
  }

  async applyDiscount(body: OrderBody): Promise<number> {
    // Método para calcular el descuento a aplicar en la órden
  try {
    const totalOrders = await db.order.count({
      where: {
        order_client: body.order_client,
      }
    });

    if (totalOrders > 7) return 0.5;
    if (totalOrders > 5) return 0.2;
    if (totalOrders > 3) return 0.1;
    return 0;

  }
  catch (error) {
    console.error(error);
    throw new Error("Error al aplicar descuento.");
  }
}

  calculateTotalAmount(body: OrderBody) {
  // Método para calcular el monto total de la órden.
    return body.plates.length * 100;
  }

  async createOrder(body: OrderBody) {
  // Método para crear una nueva órden.
    try {
      const discount = await this.applyDiscount(body);
      const total = this.calculateTotalAmount(body);
      const totalWithDiscount = total - total * discount;

      const order = await db.order.create({
        data: {
          order_client: body.order_client,
          status: body.status,
          plates: JSON.stringify(body.plates),
          deliver_address: body.deliver_address,
          discount,
          total: totalWithDiscount,
        },
      });

      return {
        ...order,
        plates: JSON.parse(order.plates),
      };

    } catch (error) {
      console.error("Error creando la órden: ", body);
      console.error(error);
      throw new Error("Error al crear órden.");
    }
  }

  async updateOrder(body: OrderBody) {
  // Método para actualizar la órden.
    try {
      const order = await db.order.findFirst({
        where: { 
          order_id: body.order_id 
        },
      });

      if (!order) {
        throw new Error(`No se encontró la mesa con id ${body.order_id}`);
      }

      const updatedOrder = await db.order.update({where: { order_id: body.order_id },
        data: {
          order_client: body.order_client,
          status: body.status,
          plates: JSON.stringify(body.plates),
          deliver_address: body.deliver_address,
        },
      });

      return updatedOrder;
    } catch (error) {
      console.error("Error actualizando el estado de la órden.");
      console.error(error);
      throw new Error(`Error al actualizar la órden con id ${body.order_id}.`);
    }
  }

  async cancelOrder(orderId: number) {
    try {
      const order = await db.order.delete({
        where: {
          order_id: orderId,
        }
      });
      if (!order) {
        throw new Error(`No se encontró la mesa con id ${orderId}`);
      }

      return order;
    }
    catch (error: any) {
      console.error("Error eliminando la órden.")
      console.error(error);
      throw new Error(error.message || `Error al eliminar la órden con id ${orderId}.`);
    }
  }
}