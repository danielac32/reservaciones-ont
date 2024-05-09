import { reservationService } from "../Reservar/dependencies";
import { SalonController } from "./controller/salon.controller";
import { SalonService } from "./services/salon.service";

export const salonService = new SalonService(reservationService);
export const salonController = new SalonController(salonService);