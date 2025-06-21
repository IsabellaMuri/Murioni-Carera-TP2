import { Router, Request, Response } from "express";
import { tableService } from "../services/tableService";
import { isAdminMiddleware, jwtAuthMiddleware } from "../middleware/authentication-middleware";

const tableServiceInstance = new tableService();

const tableRouter = Router();

tableRouter.get("/", isAdminMiddleware, async (_: Request, res: Response) => {
  try {
    const tables = await tableServiceInstance.getAllTables();
    res.status(200).json({ ok: true, data: tables });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

tableRouter.get("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const tableId = parseInt(req.params.id); 
    const table = await tableService.getTableById(tableId);
    res.status(200).json({ ok: true, data: table});
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

tableRouter.get("/", jwtAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const table = await tableServiceInstance.getAvailableTables();
    res.status(200).json({ ok: true, data: table});
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

tableRouter.post("/", isAdminMiddleware, async (req: Request, res: Response) => {
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

tableRouter.delete("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const tableId = parseInt(req.params.id);
      const table = await tableServiceInstance.deleteTable(tableId);

      res.status(200).json({ ok: true, data: table });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});
export { tableRouter };