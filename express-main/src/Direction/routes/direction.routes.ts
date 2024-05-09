import { Router } from 'express';
import { directionController } from '../dependencies';
import { validateJwt } from '../../shared/middlewares/validateJwt'



const router = Router();

router.post('/',
// [validateJwt], 
directionController.create);
router.get('/',[validateJwt], directionController.read);
router.get('/:id',[validateJwt], directionController.readById);
router.patch('/:id',[validateJwt], directionController.update);
router.delete('/:id',[validateJwt], directionController.delete);

export default router;