import { Router } from "express";
import { reservationController } from "../dependencies";
import { createReserveMiddleware } from '../middlewares/create-reserve.middleware';
import { validateJwt } from '../../shared/middlewares/validateJwt'


const router = Router();

router.post('/', [validateJwt,createReserveMiddleware],reservationController.create);
router.get('/',reservationController.read);
router.get('/:id', [validateJwt],reservationController.readById);
router.patch('/:id', [validateJwt],reservationController.update);
router.delete('/:id', [validateJwt],reservationController.delete);
router.patch('/:id/change-status', [validateJwt],reservationController.changeStatusInReservation);


export default router;