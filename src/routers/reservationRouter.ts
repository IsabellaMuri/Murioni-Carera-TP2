import { Router, Request, Response } from "express";
import { reservationService } from "../services/reservationService";

const ReservationService = new reservationService();

export const reservationRouter = Router();

reservationRouter.get("/", async (_: Request, res: Response) => {
  try {
    const reservations = await ReservationService.getAllReservations();

    res.status(200).json({ ok: true, data: reservations });

  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

reservationRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const reservationId = parseInt(req.params.id); 
    const reservation = await ReservationService.getReservationById(reservationId);

    res.status(200).json({ ok: true, data: reservation});

  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

reservationRouter.post("/", async (req: Request, res: Response) => {
  try {
      const ReservationBody = req.body;
      const reservation = await ReservationService.createReservation(ReservationBody);

      res.status(200).json({ ok: true, data: reservation });

  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

reservationRouter.get("/table/:tableId", async (req: Request, res: Response) => {
  try {
    const reservedTableId = parseInt(req.params.tableId); 
    const reservations = await ReservationService.getReservationByTable(reservedTableId);

    res.status(200).json({ ok: true, data: reservations});

  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

reservationRouter.get("/client/:clientId", async (req: Request, res: Response) => {
  try {
    const reservationClientId = parseInt(req.params.clientId); 
    const reservations = await ReservationService.getReservationById(reservationClientId);

    res.status(200).json({ ok: true, data: reservations});

  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});