//import { UserEntity } from '../entities/user.entity';
//import { ReservationEntity} from '../../Reservar/entities/reserve.entity';
import { User } from '../interfaces/user.interface';
import { generateJwt } from '../../shared/generate-jwt';
import { prisma } from "../../db/db-connection";
import { ReservationServices } from '../../Reservar/services/reservation.service';
import { encrypt, decrypt } from '../../shared/helpers/encypt';
import { StatusReserveTypes,StatusReserve } from "../../Reservar/interfaces/reserve.interface";
import { FilterQueryReservation } from '../../Reservar/interfaces/filter-querys';

export class UserServices {
    constructor(
        private reservationServices: ReservationServices
    ) {}
    

    public createUser = async(user: User) => {
        const res = await this.getUser(user.email);
   
        if(!res.error){//si existe el usuario no se puede crear otro igual 
            return {
                error:true,
                code:401,
                message:"El usuario ya existe"
            }
        }
        const hashPassword = encrypt(user.password);
        try {
            const newUser = await prisma.userEntity.create({
                data:{
                    name:  user.name,
                    email: user.email,
                    password: hashPassword,
                    direction: { connect: { id: user.directionId } },
                    rol:user.rol
                }
            });
            return {
                error:false,
                code:201,
                newUser
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    };
    
 
    public getUsers = async() => {
        try {
             const users = await prisma.userEntity.findMany({
              include: {
                direction: true,
              },
            });
            console.log(users.length);

            if(!users.length)return {
                error:true,
                code:404,
                message:"users not found"
            };

            return {
                error:false,
                code:200,
                users
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    public getUser = async(term: string) => {
        let user;
        // Verifica si el término es un correo electrónico
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(term)) {
            user = await prisma.userEntity.findFirst({
                where: {
                        email: term
                }
            });
        }
        if (!user) {
            const userId = parseInt(term);
            if (!isNaN(userId)) {
              user = await prisma.userEntity.findUnique({
                where: {
                  id: userId
                }
              });
            }
        }
        if(!user)return {
            error:true,
            code:404,
            message:"user not found"
        }
        return {
            error:false,
            code:200,
            user
        }
    }

    public resetPassword = async(email: string) => {
        try{
            const {user} = await this.getUser(email);
      
            if(!user) return {
                error:true,
                code:404,
                message:"user not found"
            }

            const updatedUser = await prisma.userEntity.update({
                where: {
                    id: user.id
                },
                data:{
                    password:encrypt("Ont123456"),
                }
            });
            return {
                error:false,
                code:200,
                updatedUser
            }
        }catch (error) {
            console.log(error);
            throw error;
        }
    }

    public updateRol = async(email: string, rol: string) => {
        try{
            const {user} = await this.getUser(email);

            if(!user) return {
                error:true,
                code:404,
                message:"user not found"
            }

            const updatedUser = await prisma.userEntity.update({
                where: {
                    id: user.id
                },
                data:{
                    rol
                }
            });
            return {
                error:false,
                code:200,
                updatedUser
            }
        }catch (error) {
            console.log(error);
            throw error;
        }
    }
    public updateActive = async(email: string,active: boolean) => {
        try{
            const {user} = await this.getUser(email);

            if(!user) return {
                error:true,
                code:404,
                message:"user not found"
            }

            const updatedUser = await prisma.userEntity.update({
                where: {
                    id: user.id
                },
                data:{
                    isActive:active
                }
            });
            return {
                error:false,
                code:200,
                updatedUser
            }
        }catch (error) {
            console.log(error);
            throw error;
        }
    }
    public updateUser = async(email: string,newData: User) => {
        try {
            const {user} = await this.getUser(email);
            if(!user) return {
                error:true,
                code:404,
                message:"user not found"
            }
            const hashPassword = encrypt(newData.password);

            const updatedUser = await prisma.userEntity.update({
              where: {
                id: user.id
              },
              data:{
                name:  newData.name,
                email: newData.email,
                password: hashPassword,
                direction: { connect: { id: newData.directionId } }
              }
              //data: newData,
            });
            return {
                error:false,
                code:200,
                updatedUser
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public deleteUser = async(email: string) => {
        try {
            const {user}  = await this.getUser(email);
            console.log(user);
            if(!user) return {
                error:true,
                code:404,
                message:"user not found"
            }
            const deletedUser = await prisma.userEntity.delete({
              where: {
                id: user.id,
              },
            });
            return {
                error:false,
                code:200,
                deletedUser
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public loginUser = async(email: string, password: string) => {
        try {
            const {user} = await this.getUser(email);

            if(!user) return {
                error:true,
                code:401,
                message:"user not found"
            }

            if(decrypt(password, user.password)) {
                const token = await generateJwt(user.email);
                return {
                    error:false,
                    code:200,
                    user,
                    token
                }
            }
            return {
                error:true,
                code:401,
                message:"login error"
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    public getReservationsByUserDate = async(id: string,dateStart:string,dateEnd:string) =>{
            try {
                const {user} = await this.getUser(id);
                if(!user) return {
                    error:true,
                    code:404,
                    message:"user not found! getReservationsByUserDate"
                }
                const res = await this.reservationServices.ReservationsByUserDate(user.id,dateStart,dateEnd);
           
                return {
                    error: false,
                    code: 200,
                    res
                }
            } catch (error) {
            throw error;
        }
    }


    public getReservationsByUser = async(term: string, state?:string, limit?: number, page?: number) => {
    
        let statusType: StatusReserveTypes;
        statusType = state as StatusReserveTypes;

        try {
            const {user} = await this.getUser(term);
            if(!user) return {
                error:true,
                code:404,
                message:"user not found!"
            }

            const { total, reservations, lastPage } = await this.reservationServices
                .reservationsByUser(user.id, statusType, limit, page);

            return {
                error: false,
                code: 200,
                reservations,
                meta: {
                    total,
                    page,
                    lastPage
                }
            }

        } catch (error) {
            throw error;
        }
    }
};