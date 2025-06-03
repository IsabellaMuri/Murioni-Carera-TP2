import { Request, Response } from "express";
import { tableService } from "../services/tableService";

const TableService = new tableService();

export const getAllTables = async (_: Request, res: Response) => {
  try {
    const tables = await TableService.getAllTables();
    res.status(200).json({ ok: true, data: tables });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
};

export const getTableById = async (req: Request, res: Response) => {
  try {
    const tableId = parseInt(req.params.id); 
    const table = await TableService.getTableById(tableId);
    res.status(200).json({ ok:true, data: table});
  } catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
};

export const createTable = async (req: Request, res: Response) => {
    try {
        const tableId = parseInt(req.body.user_id);
        const tableBody = req.body;
        
        const table = await TableService.createTable({table_number: tableId, status: tableBody});

        res.status(200).json({ ok: true, data: table });
    } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
    }
}
