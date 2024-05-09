import { reservationService } from "../Reservar/dependencies";
import { UserController } from "./controllers/user.controller";
import { UserServices } from "./services/user.service";

// USERS
export const userServices = new UserServices(reservationService);
export const userController = new UserController(userServices);