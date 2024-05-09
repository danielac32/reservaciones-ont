import { Router } from 'express';
import { userController } from '../dependencies';
import { createUserMiddleware } from '../middlewares/create-user.middleware';
import { loginUserMiddleware } from '../middlewares/login-user.middleware';
import { updateUserMiddleware } from '../middlewares/update-user.middleware';
import { UpdateActiveUserMiddleware } from '../middlewares/update-active.middleware';
import { validateJwt } from '../../shared/middlewares/validateJwt'
const router = Router();

// CRUD USERS
router.post('/users',[
    createUserMiddleware,
],userController.storeUser);
//router.post('/users',userController.sotreUser);
router.get('/users', /*[validateJwt] ,*/userController.allUsers);
router.get('/users/:email', [validateJwt],userController.userByEmail);
router.patch('/users/:email', [validateJwt,updateUserMiddleware],userController.updateUserByEmail);

router.get('/users/reservations/:userId/:startDate/:endDate',[validateJwt] ,userController.reservationsByUserDate);

router.delete('/users/:email', [validateJwt],userController.deleteUserByEmail);
router.patch('/resetPassword/:email',[validateJwt],userController.resetPassword);
router.patch('/userRol/:email',[validateJwt],userController.updateUserRol);
router.patch('/userActive/:email',[validateJwt],userController.updateUserIsActive);
// RESERVATIONS USERS
router.get('/users/:term/reservations/', [validateJwt] , userController.reservationsByUser);
//LOGIN
router.post('/auth/login', [loginUserMiddleware],userController.login);

export default router;
