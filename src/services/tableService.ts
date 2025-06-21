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
      return tables
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
          status: true
        }
      })

      return tables
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al obtener las mesas disponibles.")
    }
  }

  static async getTableById(tableId: number) {
  // Método para obtener una mesa con un ID especifico.
    try {
      const table = await db.table.findFirst({
        where:{
          table_number: tableId
        }
      })

      if (!table) {
        throw new Error("No existe la mesa.")
      }

      return table
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

      return table
    }
    catch (error) {
      console.error(error);
      throw new Error("Error al crear mesa.")
    }
  }

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
      return deletedTable
    } 
    catch (error) {
      throw new Error(`Error al eliminar la mesa con id ${tableId}.`) 
    }
  }
}