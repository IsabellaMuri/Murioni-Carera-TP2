import { Order } from "@prisma/client";
import { db } from "../db/db";

interface orderBody {
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

export class orderService { 
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

  //HACER Q DEVUELVA PLATOS
  async getOrderById(orderId: number) : Promise<Omit<Order, 'plates'> & { plates: string[] } | null> {
    // Método para obtener una órden en base a un id específico.
    try {
      const order = await db.order.findUnique({
        where: { 
          order_id: orderId 
        },
      });

      //devolver error en vez de null
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

  //POR PLATOS NO X ORDERS
  async applyDiscount(body: orderBody): Promise<number> {
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

  calculateTotalAmount(total: number, discount : number) {
    // Método para calcular el monto total de la órden.
    return total - total * discount / 100;
  }

  async createOrder(body: orderBody) {
    // Método para crear una nueva órden.
    try {
      const discount = await this.applyDiscount(body);

      //agg un calcular subtotal/total sin desc 
      //es agarrar los pllatos y agarrar el campo precio de los platos ysumarlos
      /* const total = this.calculateTotalAmount(body); */
      const totalWithDiscount = this.calculateTotalAmount(total, discount);

      const order = await db.order.create({
        data: {
          order_client: body.order_client,
          status: body.status,
          plates: JSON.stringify(body.plates),
          deliver_address: body.deliver_address,
          discount: discount,
          total: totalWithDiscount,
        },
      });

      return {
        ...order,
        plates: JSON.parse(order.plates),
      };

    } catch (error) {
      console.error(error);
      throw new Error("Error al crear órden.");
    }
  }

  async updateOrder(body: orderBody) {
    // Método para actualizar la órden.
    try {
      const order = await db.order.findFirst({
        where: { 
          order_id: body.order_id 
        },
      });

      if (!order) {
        throw new Error(`No se encontró la órden con id ${body.order_id}`);
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
      console.error(error);
      throw new Error(`Error al actualizar la órden con id ${body.order_id}.`);
    }
  }

  async cancelOrder(orderId: number) {
    // Método para cancelar una órden con un ID específico.
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
    catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar la órden con id ${orderId}.`);
    }
  }
}