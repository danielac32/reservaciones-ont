import { Reserve, StatusReserve, StatusReserveTypes } from "../interfaces/reserve.interface";
import { prisma } from "../../db/db-connection";
import { FilterQueryReservation } from "../interfaces/filter-querys";

export class ReservationServices {
    public createReservation = async(reserveData: Reserve) => {
        const startDate=new Date(reserveData.startDate);
        const endDate=new Date(reserveData.endDate);
        const current=new Date();

        startDate.setHours(startDate.getHours() - 4);
        endDate.setHours(endDate.getHours() - 4);

        try {
            const newReservation = await prisma.reservation.create({
                data:{
                    startDate: startDate,//new Date(reserveData.startDate),
                    endDate: endDate,//new Date(reserveData.endDate),
                    requerimiento:reserveData.requerimiento,
                    cantidad_persona:reserveData.cantidad_persona,
                    descripcion:reserveData.descripcion,
                    state: StatusReserve.PENDING,
                    userId: reserveData.userId,
                    salonId: reserveData.salonId,
                    createdAt: current
                }
            });
            return newReservation;
        } catch (error) {
            console.log(error,current);
            throw error
        }
    };


    getDate(dateTime: Date): string {
      return dateTime.toISOString().split('T')[0]; // Obtenemos solo la parte de la fecha
    }
    public getReservations = async(filter?: FilterQueryReservation, page = 1, limit = 10) => {
        try {
            const [total, reservations] = await Promise.all([
                prisma.reservation.count({ where: filter}),
    
                prisma.reservation.findMany({
                    where: filter,
                    include: {
                        user:{
                            include: {
                            direction:true
                            }
                        }
                    },
                    skip: (page -1 )* limit,
                    take: limit,
                })
            ]);
    
            const lastPage = Math.ceil(total / limit);
    
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
    public getReservation = async(id: number) => {
        try {
            const Reservation = await prisma.reservation.findFirst({
              where: {
                id
              },
              include: {
                user:{
                   include: {
                    direction:true
                   }
                }
            }
            })
            return Reservation;
        } catch (error) {
            console.log(error);       
            throw error;
        }
    }

    public updateReservation = async(reservationId: number,newData: Reserve) => {
        try {    
            const updatedReservation = await prisma.reservation.update({
              where: {
                id: reservationId
              },
              data: newData,
            });
            return updatedReservation;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public deleteReservation = async(reservationId: number) => {
        try {
            const dataReservation = await this.getReservation(reservationId);
            if(!dataReservation) return null;
    
           // const prisma = new PrismaClient();
            const deletedReservation = await prisma.reservation.delete({
              where: {
                id: dataReservation.id,
              },
            });
            return deletedReservation;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    public reservationsBySalonDate = async(salonId:number,startDate:string,endDate:string) =>{
            try {
                console.log("reservation by date: ",startDate,endDate)
                const reservations = await prisma.reservation.findMany({
                      where: {
                              salonId: salonId,
                              createdAt: 
                              { 
                                  gte: new Date(startDate).toISOString(), 
                                  lte: new Date(endDate).toISOString() 
                              } 
                      },
                      include: {
                            user: {
                                include: {
                                        direction: true
                                }
                            },
                            salon: true
                      }
                });
                return reservations;
            } catch (error) {
            throw error;
        }
    }

    public ReservationsByUserDate = async(userId:number,startDate:string,endDate:string) =>{
            try {
                console.log("reservation by date: ",startDate,endDate)
                const reservations = await prisma.reservation.findMany({
                      where: {
                              userId: userId,
                              createdAt: 
                              { 
                                  gte: new Date(startDate).toISOString(), 
                                  lte: new Date(endDate).toISOString() 
                              } 
                      },
                      include: {
                            user: {
                                include: {
                                        direction: true
                                }
                            },
                            salon: true
                      }
                });
                return reservations;
            } catch (error) {
            throw error;
        }
    }

    public reservationsByUser = async(userId: number, status?: StatusReserveTypes, limit: number = 10, page: number = 1) => {
        try {
            // const reservations = await prisma.reservation.findMany({
            //     where: { userId, state: status },
            //     include: {
            //        user:{
            //           include: {
            //             direction:true
            //           }
            //        }
            //     },
            //     skip: (page -1 ),
            //     take: limit,
            // })
            // return reservations;
            const [total, reservations] = await Promise.all([
                prisma.reservation.count({ where: { userId, state: status }}),

                prisma.reservation.findMany({
                    where: { userId, state: status },
                    include: {
                        user:{
                            include: {
                            direction:true
                            }
                        }
                    },
                    skip: (page -1 )* limit,
                    take: limit,
                })
            ]);

            const lastPage = Math.ceil(total / limit);

            return {
                total,
                lastPage,
                page,
                reservations,
            };
        } catch (error) {
            throw error;
        }
    }
    public reservationsBySalon = async(salonId: number) => {
        try {
            const reservations = await prisma.reservation.findMany({
                where: {
                    salonId
                }
            })
            return reservations;
        } catch (error) {
            throw error;
        }
    }
    public changeReservationStatus = async(id: number, status: StatusReserveTypes) => {
        try {
            const reservation = await prisma.reservation.update({
                where: {
                    id
                },
                data: {
                    state: status
                }
            });
            return reservation;
        } catch (error) {
            throw error;
        }
    }
};