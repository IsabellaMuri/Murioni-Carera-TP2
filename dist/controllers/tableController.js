"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = exports.getTableById = exports.getAllTables = void 0;
const tableService_1 = require("../services/tableService");
const TableService = new tableService_1.tableService();
const getAllTables = async (_, res) => {
    try {
        const tables = await TableService.getAllTables();
        res.status(200).json({ ok: true, data: tables });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
exports.getAllTables = getAllTables;
const getTableById = async (req, res) => {
    try {
        const tableId = parseInt(req.params.id);
        const table = await TableService.getTableById(tableId);
        res.status(200).json({ ok: true, data: table });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
exports.getTableById = getTableById;
const createTable = async (req, res) => {
    try {
        const tableId = parseInt(req.body.user_id);
        const tableBody = req.body;
        const table = await TableService.createTable({ table_number: tableId, status: tableBody });
        res.status(200).json({ ok: true, data: table });
    }
    catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
exports.createTable = createTable;
