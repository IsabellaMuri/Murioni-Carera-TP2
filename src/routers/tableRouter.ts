import { Router, Request, Response } from "express";
import { tableService } from "../services/tableService";

const TableService = new tableService();

export const tableRouter = Router();

tableRouter.get("/", async (_: Request, res: Response) => {
  try {
    const tables = await TableService.getAllTables();
    res.status(200).json({ ok: true, data: tables });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

tableRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const tableId = parseInt(req.params.id); 
    const table = await TableService.getTableById(tableId);
    res.status(200).json({ ok:true, data: table});
  } catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

tableRouter.post("/", async (req: Request, res: Response) => {
    try {
        const tableId = parseInt(req.body.user_id);
        const tableBody = req.body;
        
        const table = await TableService.createTable({table_number: tableId, status: tableBody});

        res.status(200).json({ ok: true, data: table });
    } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
    }
});

tableRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const tableId = parseInt(req.body.user_id);
        const tableBody = req.body;
        
        const table = await TableService.updateStatus({table_number: tableId, status: tableBody});

        res.status(200).json({ ok: true, data: table });
    } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
    }
});

tableRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const tableId = parseInt(req.body.user_id);
        
        const table = await TableService.deleteTable(tableId);

        res.status(200).json({ ok: true, data: table });
    } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
    }
});

tableRouter.get("/", async (req: Request, res: Response) => {
    try {
        const tableId = parseInt(req.body.user_id);
        
        const table = await TableService.getStatus(tableId);

        res.status(200).json({ ok: true, data: table });
    } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
    }
});