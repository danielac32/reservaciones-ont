import { DirectionController } from "./controller/direction.controller";
import { DirectionService } from "./services/direction.service";

export const directionService = new DirectionService();
export const directionController = new DirectionController(directionService);