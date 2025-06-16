import { Router, Request, Response } from "express";
import { plateService } from "../services/plateService";

const PlateService = new plateService();

export const plateRouter = Router();

plateRouter.get("/", async (_: Request, res: Response) => {
  try {
    const plates = await PlateService.getAllPlates();

    res.status(200).json({ ok: true, data: plates });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const plateId = parseInt(req.params.id);
    const plate = await PlateService.getPlateById(plateId);

    res.status(200).json({ ok: true, data: plate });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});



plateRouter.post("/", async (req: Request, res: Response) => {
  try {
      const PlateBody = req.body;
      const plate = await PlateService.createPlate(PlateBody);

      res.status(200).json({ ok: true, data: plate });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.put("/:id", async (req: Request, res: Response) => {
  try {
      const plateBody = req.body;
      const plate = await PlateService.updatePrice(plateBody);

      res.status(200).json({ ok: true, data: plate });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
      const plateId = parseInt(req.params.id);
      const plate = await PlateService.deletePlate(plateId);

      res.status(200).json({ ok: true, data: plate });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

plateRouter.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const platesCategory = req.params.category;
    const plates = await PlateService.getPlatesByCategory(platesCategory);

    res.status(200).json({ ok: true, data: plates });
  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});