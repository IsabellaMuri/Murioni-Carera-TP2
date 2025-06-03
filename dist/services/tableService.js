"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableService = void 0;
//completar
const db_1 = require("../db/db");
class tableService {
    async getAllTables() {
        // Método para obtener todas las mesas definidas en la db.
        try {
            const table = await db_1.db.table.findMany({});
            return table;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener las mesas.");
        }
    }
    async getTableById(tableId) {
        // Método para obtener una mesa con un ID especifico.
        try {
            const table = await db_1.db.table.findFirst({
                where: {
                    id: tableId,
                }
            });
        }
        catch (error) {
            console.error(error);
            throw new Error("Error al obtener la mesa con id ");
        }
    }
    async createTable(body) {
        // Método para crear una nueva mesa.
        try {
            const tablesQty = await db_1.db.table.count();
            if (tablesQty > 15) {
                throw new Error('No se pueden crear más de 15 mesas.');
            }
            const table = await db_1.db.table.create({
                data: body,
            });
            return table;
        }
        catch (error) {
            console.error("Error creando la mesa: ", body);
            console.error(error);
            throw new Error("Error al crear mesa.");
        }
    }
    async updateStatus(body) {
        // Método para actualizar el estado de la mesa en base a lo que se le pase.
        try {
            const table = await db_1.db.table.findFirst({
                where: {
                    id: body.table_number,
                }
            });
            if (!table) {
                throw new Error(`No se encontró la mesa con id ${body.table_number}`);
            }
            const updatedTable = await db_1.db.table.update({
                where: { id: body.table_number },
                data: body // Modifica la data de la mesa.
            });
            return updatedTable;
        }
        catch (error) {
            console.error("Error actualizando el estado de la mesa.");
            console.error(error);
            throw new Error(`Error al actualizar el estado de mesa con id ${body.table_number}.`);
        }
    }
    async deleteTable(tableId) {
        // Método para eliminar una mesa.
        try {
            const table = await db_1.db.table.findFirst({
                where: {
                    id: tableId
                }
            });
            if (!table) {
                throw new Error(`Error al encontrar la mesa con id ${tableId}.`);
            }
            const deletedTable = await db_1.db.table.delete({
                where: {
                    id: tableId
                }
            });
            return deletedTable;
        }
        catch (error) {
            throw new Error(`Error al eliminar la mesa con id ${tableId}.`);
        }
    }
    async getStatus(tableId) {
        // Método para devolver el estado de la mesa.
        try {
            const table = await db_1.db.table.findFirst({
                where: {
                    id: tableId
                }
            });
            if (!table) {
                throw new Error(`Error al encontrar la mesa con id ${tableId}.`);
            }
            return table.status;
        }
        catch (error) {
            throw new Error(`Error al obtener el status de la mesa con id ${tableId}.`);
        }
    }
}
exports.tableService = tableService;
