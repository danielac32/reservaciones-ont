import { prisma } from "../../db/db-connection";
import { Direction } from "../interfaces/direction.interface";


export class DirectionService {
    public createDirection = async(data: Direction) => {
        try {
            const newDirection = await prisma.direction.create({
                data: {
                    address: data.address
                }
            });
            return newDirection;
        } catch (error) {
            throw error;
        }
    };

    public getDirections = async() => {
        try {
            const directions = await prisma.direction.findMany();
            return directions;
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    
    public getDirection = async(id: number) => {
        try {
            const direction = await prisma.direction.findFirst({
              where: {
                //userId: userId,
                id:id
              },
            })
            return direction;
        } catch (error) {
            console.log(error);       
            throw error;
        }
    }

    public updateDirection = async(id: number,newData:Direction) => {
        try {
            const dataDirection = await this.getDirection(id);
            if(!dataDirection) return null;
            const updatedDirection = await prisma.direction.update({

              where: {
                id: dataDirection.id
              },
              data: {address:newData.address},
            });
            return updatedDirection;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public deleteDirection = async(id: number) => {
        try {
            const dataDirection = await this.getDirection(id);
            if(!dataDirection) return null;
    
            const deletedDirection = await prisma.direction.delete({//delete
             where: {
                id: dataDirection.id
              },
              include: {
                    users: true, // Incluir usuarios relacionados
              },
            });
            return deletedDirection;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};