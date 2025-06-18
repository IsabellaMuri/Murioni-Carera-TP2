import { Table } from "@prisma/client";

import { db } from "../db/db";

interface TableBody {
  table_number: number
  status: boolean
}

export class tableService {
  async getAllTables() {
  // Método para obtener todas las mesas definidas en la db.
  try {
      const tables = await db.table.findMany({})
      return tables;
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener las mesas.")
    }
  }

  async getAvailableTables() {
    // Método para obtener todas las mesas dispoonibles.
    try {
      const tables = await db.table.findMany({
        where: {
          status: true,
        }
      })

      return tables;
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener las mesas disponibles.")
    }
  }

  async getTableById(tableId: number) {
  // Método para obtener una mesa con un ID especifico.
    try {
      const table = await db.table.findFirst({
        where:{
          table_number: tableId,
        }
      })

      if (!table) {
        throw new Error("No existe la mesa.")
      }

      return table;
    }
    catch (error){
      console.error(error);
      throw new Error(`Error al obtener la mesa con id ${tableId}`)
    }
  }
  
  async createTable(body: TableBody) {
  // Método para crear una nueva mesa.
    try {
      const tablesQty = await db.table.count()
      if (tablesQty >= 15) {
        throw new Error('No se pueden crear más de 15 mesas.');
      }

      const table = await db.table.create({
        data: body
      })
      return table;

    }
    catch (error) {
      console.error(error);
      throw new Error("Error al crear mesa.")
    }
  }

  /* async updateStatus(body: TableBody) {
    // Método para actualizar el estado de la mesa en base a lo que se le pase.
    try {
      const table = await db.table.findFirst({
        where: {
          table_number: body.table_number,
        }
      })

      if (!table) {
        throw new Error(`No se encontró la mesa con id ${body.table_number}`)
      }

      const updatedTable = await db.table.update({
        where: { 
          table_number: body.table_number
        },
        data: body // Modifica la data de la mesa.
      })

      return updatedTable;

    }
    catch (error) {
        console.error("Error actualizando el estado de la mesa.")
        console.error(error);
        throw new Error(`Error al actualizar el estado de mesa con id ${body.table_number}.`) 
    }
  } */

  async deleteTable(tableId: number) {
    // Método para eliminar una mesa.
    try {
      const table = await db.table.findFirst({
        where: {
          table_number: tableId
        }
      })

      if(!table){
      throw new Error(`Error al encontrar la mesa con id ${tableId}.`) 
      }
        
      const deletedTable = await db.table.delete({
      where: {
        table_number: tableId
      }
      })
      return deletedTable;
    } 
    catch (error) {
      throw new Error(`Error al eliminar la mesa con id ${tableId}.`) 
    }
  }
}