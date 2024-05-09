import { Request, Response } from 'express';
import { UserServices } from '../services/user.service';
export class UserController {
    constructor (
        private userServices: UserServices
    ) {}


    public reservationsByUserDate = async(req: Request, res: Response) => {
            try{
                const { userId, startDate, endDate } = req.params;
                const data = await this.userServices.getReservationsByUserDate(userId, startDate, endDate);  
                if(data.error) return res.status(data.code).json(data.message);

                res.status(data.code).json(data);
            }catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Internal server error' });
            }
    } 
    public storeUser = async(req: Request, res: Response) => {
        try {
            const body = req.body;
            const data = await this.userServices.createUser(body);  
            if(data.error) return res.status(data.code).json(data.message);
            
            res.status(data.code).json(data.newUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    public allUsers = async(req: Request, res: Response) => {
        try {
            const data = await this.userServices.getUsers();
            if(data.error) return res.status(data.code).json(data.message);
            
            res.status(data.code).json(data);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    public userByEmail = async(req: Request, res: Response) => {
        try {
            const { email } = req.params;
            const data = await this.userServices.getUser(email);
            if(data.error) return res.status(data.code).json(data.message);
            
            res.status(data.code).json(data.user);
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };
    public updateUserByEmail = async(req: Request, res: Response) => {
    try {
            const body = req.body;
            const { email } = req.params;
            const data = await this.userServices.updateUser(email,body);
            if(data.error) return res.status(data.code).json(data.message);
            
            res.status(data.code).json({
                user:data.updatedUser,
                status:data.code
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };
    public updateUserIsActive = async(req: Request, res: Response) => {
    try {
            const {isActive} = req.body;
            const { email } = req.params;

            const data = await this.userServices.updateActive(email,isActive);
            if(data.error)
                return res.status(data.code).json(data.message);
           
            return res.status(data.code).json({
                user:data.updatedUser,
                status:data.code
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };
    public resetPassword = async(req: Request, res: Response) => {
    try {
            const { email } = req.params;

            const data = await this.userServices.resetPassword(email);
            if(data.error) return res.status(data.code).json(data.message);
            return res.status(data.code).json({
                status:data.code
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }

    public updateUserRol = async(req: Request, res: Response) => {
    try {
            const {rol} = req.body;
            const { email } = req.params;

            const data = await this.userServices.updateRol(email,rol);
            if(data.error) return res.status(data.code).json(data.message);
            return res.status(data.code).json({
                user:data.updatedUser,
                status:data.code
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };
    public deleteUserByEmail = async(req: Request, res: Response) => {
        try {
            const data = await this.userServices.deleteUser(req.params.email);
            if(data.error) return res.status(data.code).json(data.message);
            return res.status(data.code).json(data.deletedUser);
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    public reservationsByUser = async(req: Request, res: Response) => {
        const { term } = req.params;
        const { state, limit = 10, page = 1 } = req.query;

        try {

            const resp = await this.userServices.getReservationsByUser(term as string, state as string, Number(limit), Number(page));
            if(resp.error) return res.status(resp.code).json(resp.message);
            return res.status(resp.code).json({ reservations: resp.reservations, meta: resp.meta });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal server error' })
        };
    };

    public login = async(req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
    
            const data = await this.userServices.loginUser(email, password);
            if(data.error)
                return res.status(data.code).json(data.message);
            
            return res.status(data.code).json({
                user:data.user,
                token:data.token,
                status:data.code
            });
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };
};