import { Router } from 'express';
import { salonController } from '../dependencies';
import { validateJwt } from '../../shared/middlewares/validateJwt'

const router = Router();

router.post('/', /*[validateJwt], */salonController.create);
router.get('/', /*[validateJwt], */ salonController.read);
router.get('/:id', [validateJwt],salonController.readById);
router.patch('/:id',[validateJwt], salonController.update);
router.delete('/:id',[validateJwt], salonController.delete);

// Reservations
router.get('/:id/reservations',[validateJwt], salonController.getReservationsBySalon);
router.get('/reservations/:salonId/:startDate/:endDate',[validateJwt] ,salonController.reservationsBySalon);

export default router;