import {  } from "@prisma/client";
//completar

import { db } from "../db/db";

interface OrderBody {
  number: number
  client_order: number
  status: string
  plates: string[]
  total_amount: number
  discount_percentage: number
  deliver_adress: string
}

export class orderService{
  getAllOrders(){
  // Método para obtener todas las órdenes.

  }

  getOrderById() {
  // Método para obtener una órden en base a un id específico.

  }

  applyDiscount() {
  // Método para aplicar los descuentos según la cantidad de platos en la órden.

  }

  calculateTotalAmount() {
  // Método para calcular el monto total de la órden.

  }

  createOrder() {
  // Método para crear una nueva órden.

  }

  updateOrder() {
  // Método para actualizar la órden.

  }

  cancelOrder() {
  // Método para cancelar una órden.
    
  }

  getStatus() {
  // Método para obtener el estado de la órden.

  }
}