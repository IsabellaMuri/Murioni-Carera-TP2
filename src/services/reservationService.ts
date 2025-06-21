import { Reservation } from "@prisma/client";
import { tableService } from "../services/tableService"
import { db } from "../db/db";

interface reservationBody {
	table_id: number
	user_id: number
}

export class reservationService {

	//admin
	async getAllReservations() {
		// Método para obtener todas las reservas.
		try {
			const reservations = await db.reservation.findMany({})

			return reservations
		}
		catch (error) {
			console.error(error);
      throw new Error("Error al obtener las reservas.")
		}
	}

	async getReservationByClient(userId: number) {
		// Método para obtener las reservas de un cliente con un ID específico.
		try {
			const reservationsClient = await db.reservation.findMany({
				where: {
					user_id: userId
				}
			})

			if (!reservationsClient) {
				throw new Error(`No existe cliente con id ${userId}`)
			}

			return reservationsClient
		}
		catch (error) {
			console.error(error);
      throw new Error("Error al obtener las reservas del cliente.")
		}
	}

	async createReservation(body: Reservation) {
		// Método para crear una nueva reserva.
		try {
			const table = await tableService.getTableById(body.table_id)
			console.log(table)
			if (!table) {
				throw new Error(`No existe la mesa con id ${body.table_id}`)
			}

			if (!table.status) {
				throw new Error(`La mesa con id ${body.table_id} no está disponible.`)
			}
			console.log(body)
			const reservation = await db.reservation.create({
				data: {
					reservation_id: body.reservation_id,
					datetime: body.datetime,
					table_id: body.table_id,
					user_id: body.user_id
				}
			})

			const updatedTable = await db.table.update({
				where: { table_number: body.table_id },
				data: { status: false }
			})

			return reservation
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
      const existingReservation = await db.reservation.findFirst({
        where: {
          reservation_id: reservationId
        }
      })

		if (!existingReservation) {
			throw new Error(`No se encontró la reserva con id ${reservationId}`);
		}

		const table = await tableService.getTableById(reservationId)
		const updatedTable = await db.table.update({
			where: { table_number:  existingReservation.table_id},
			data: { status: true }
		})

		const deletedReservation = await db.reservation.delete({
			where: {
				reservation_id: reservationId
			  }
		})


    return deletedReservation
    }
    catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar la reserva con id ${reservationId}.`);
    }
  }
}
