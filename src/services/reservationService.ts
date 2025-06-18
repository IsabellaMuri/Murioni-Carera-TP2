import { Reservation } from "@prisma/client";
import { db } from "../db/db";

interface reservationBody {
	reservation_id: number
	datetime: string
	table_id: number
	client_id: number
}

export class reservationService {

	//admin
	async getAllReservations() {
		// Método para obtener todas las reservas.
		try {
			const reservations = await db.reservation.findMany({})

			return reservations;
		}
		catch (error) {
			console.error(error);
      throw new Error("Error al obtener las reservas.")
		}
	}
/* 
	async getReservationById(reservationId: number) {
		// Método para obtener una reserva con un ID específico.
		try {
			const reservation = await db.reservation.findFirst({})

			if (!reservation) {
				throw new Error(`No existe reserva con id ${reservationId}`)
			}

			return reservation;
		}
		catch (error) {
			console.error(error);
      throw new Error("Error al obtener la reserva.")
		}
	} */

/* 	async getReservationByTable(tableId: number) {
		// Método para obtener las reservas de una mesa con un ID específico.
		try {
			const reservedTable = await db.reservation.findMany({
				where: {
					table_id: tableId
				}
			})

			if (!reservedTable) {
				throw new Error(`No existe mesa con id ${tableId}`)
			}

			return reservedTable;
		}
		catch (error) {
			console.error(error);
      throw new Error("Error al obtener las reserva de la mesa.")
		}
	} */

		//Cliente pueda ver SUS reservas
		// pasar id mediente el token del login
		// NO HACER /reservas:id
	async getReservationByClient(clientId: number) {
		// Método para obtener las reservas de un cliente con un ID específico.
		try {
			const reservationsClient = await db.reservation.findMany({
				where: {
					client_id: clientId
				}
			})

			if (!reservationsClient) {
				throw new Error(`No existe cliente con id ${clientId}`)
			}

			return reservationsClient;
		}
		catch (error) {
			console.error(error);
      throw new Error("Error al obtener las reservas del cliente.")
		}
	}

	async createReservation(body: reservationBody) {
		// Método para crear una nueva reserva.
		try {
			//chequeo si la mesa disponible sino error
			//creo reserva
			const reservation = await db.reservation.create({
				data: {
					reservation_id: body.reservation_id,
					datetime: body.datetime,
					table_id: body.table_id,
					client_id: body.client_id
				},
			})

			return reservation;
			// update status mesa await blabla
		}
		catch (error) {
			console.error(error);
			throw new Error("Error al crear reserva.")
		}
	}

	async deleteReservation(reservationId: number) {
		// Método para eliminar una reserva con un ID específico
		try {
        const reservation = await db.reservation.delete({
          where: {
            reservation_id: reservationId,
          }
        });

		//update status a la table a disponible

        if (!reservation) {
          throw new Error(`No se encontró la reserva con id ${reservationId}`);
        }

        return reservation;
    }
    catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar la reserva con id ${reservationId}.`);
    }
  }
}
