import { ReservationController } from "./controllers/reserve.controller";
import { ReservationServices } from "./services/reservation.service";

export const reservationService = new ReservationServices();
export const reservationController = new ReservationController(reservationService);