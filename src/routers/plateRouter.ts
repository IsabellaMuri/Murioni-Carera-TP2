import { Router, Request, Response } from "express";
import { plateService } from "../services/plateService";
import { isAdminMiddleware, jwtAuthMiddleware } from "../middleware/authentication-middleware";

const PlateService = new plateService();

export const plateRouter = Router();

plateRouter.get("/", jwtAuthMiddleware, async (_: Request, res: Response) => {
  try {
    const plates = await PlateService.getAllPlates();

    res.status(200).json({ ok: true, data: plates });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.get("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const plateId = parseInt(req.params.id);
    const plate = await plateService.getPlateById(plateId);

    res.status(200).json({ ok: true, data: plate });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.post("/", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const PlateBody = req.body;
      const plate = await PlateService.createPlate(PlateBody);

      res.status(200).json({ ok: true, data: plate });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.patch("/:id/price", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const plateId = parseInt(req.params.id);
      const { price } = req.body;

      if (typeof price !== "number" || isNaN(price)) {
        res.status(400).json({ ok: false, error: "Precio inválido" })
      }

      const updatedPlate = await PlateService.updatePrice(plateId, price);

      res.status(200).json({ ok: true, data: updatedPlate });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.delete("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const plateId = parseInt(req.params.id);
      const plate = await PlateService.deletePlate(plateId);

      res.status(200).json({ ok: true, data: plate });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.get("/category/:category", jwtAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const platesCategory = req.params.category;
    const plates = await PlateService.getPlatesByCategory(platesCategory);

    res.status(200).json({ ok: true, data: plates });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});