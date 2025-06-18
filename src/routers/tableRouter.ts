import { Router, Request, Response } from "express";
import { tableService } from "../services/tableService";

const tableServiceInstance = new tableService();

const tableRouter = Router();

tableRouter.get("/", async (_: Request, res: Response) => {
  try {
    const tables = await tableServiceInstance.getAllTables();
    res.status(200).json({ ok: true, data: tables });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

tableRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const tableId = parseInt(req.params.id); 
    const table = await tableServiceInstance.getTableById(tableId);
    res.status(200).json({ ok:true, data: table});
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

tableRouter.post("/", async (req: Request, res: Response) => {
  try {
      const { table_number, status } = req.body;
      const table = await tableServiceInstance.createTable({
        table_number,
        status,
      });

      res.status(200).json({ ok: true, data: table });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

/* tableRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const tableId = parseInt(req.params.id);
    const tableStatus = req.body;

    if (isNaN(tableId)) {
      res.status(400).json({ ok: false, error: "Id inválido." });
    }

    const table = await tableServiceInstance.updateStatus({ table_number: tableId, ...tableStatus });

    res.status(200).json({ ok: true, data: table });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
}); */

tableRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
      const tableId = parseInt(req.params.id);
      const table = await tableServiceInstance.deleteTable(tableId);

      res.status(200).json({ ok: true, data: table });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

/* tableRouter.get("/", async (req: Request, res: Response) => {
    try {
        const tableId = parseInt(req.body.table_number);
        
        const table = await TableService.getStatus(tableId);

        res.status(200).json({ ok: true, data: table });
    } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
    }
}); */
export { tableRouter };