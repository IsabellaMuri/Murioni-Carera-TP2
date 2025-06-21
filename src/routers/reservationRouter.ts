import { Router, Request, Response } from "express";
import { reservationService } from "../services/reservationService";
import { isAdminMiddleware } from "../middleware/authentication-middleware";

const ReservationService = new reservationService();

export const reservationRouter = Router();

reservationRouter.get("/", isAdminMiddleware, async (_: Request, res: Response) => {
  try {
    const reservations = await ReservationService.getAllReservations();

    res.status(200).json({ ok: true, data: reservations });

  }
  catch (error: any) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

reservationRouter.get("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
try {
  const clientId = parseInt(req.params.id); 
  const reservation = await ReservationService.getReservationByClient(clientId);

  res.status(200).json({ ok: true, data: reservation});

}
catch (error: any) {
  res.status(500).json({ ok: false, error: (error as any).message });
}
});

reservationRouter.post("/", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const ReservationBody = req.body;
      const reservation = await ReservationService.createReservation(ReservationBody);

      res.status(200).json({ ok: true, data: reservation });

  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

reservationRouter.delete("/:id", isAdminMiddleware, async (req: Request, res: Response) => {
  try {
      const reservationId = parseInt(req.params.id);
      const reservation = await ReservationService.deleteReservation(reservationId);

      res.status(200).json({ ok: true, data: reservation });
  }
  catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});