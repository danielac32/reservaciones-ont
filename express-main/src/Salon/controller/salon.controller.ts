import { Request, Response } from "express";
import { SalonService } from "../services/salon.service";

export class SalonController {
    constructor(
        private salonService: SalonService
    ) {}
    

    public reservationsBySalon = async(req: Request, res: Response) => {
            try{
                const { salonId, startDate, endDate } = req.params;
                const data = await this.salonService.getReservationsBySalonDate(Number(salonId), startDate, endDate);  
                if(data.error) return res.status(data.code).json(data.message);

                res.status(data.code).json(data);
            }catch (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Internal server error' });
            }
    } 

    public create = async(req: Request, res: Response) => {
        try {
            const newSalon = await this.salonService.createSalon({
                name: req.body.name
            })

            res.status(201).json({
                message: 'Salon created',
                salon: newSalon
            });
        } catch (error) {
            console.log(error);
            res.status(500)
        }
    };

    public read = async(req: Request, res: Response) => {
        try {
            const salones = await this.salonService.getSalones();
            res.status(200).json({
                salones
            });
        } catch (error) {
            res.status(500)
        }
    }
    public readById = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const salon = await this.salonService.getSalon(Number(id));
            console.log(salon)
            res.status(200).json({
                salon
            });
        } catch (error) {
            res.status(500)
        }
    }
    public update = async(req: Request, res: Response) => {
        try {
            const body = req.body;
            const { id } = req.params;
            const data = await this.salonService.updateSalon(Number(id),body);
            if(!data) return res.status(404).json({ msg: 'salon not found' });
            res.status(200).json( data );
        } catch (error) {
            res.status(500).json({ msg: 'Internal server error' });
        }
    };

    public delete = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await this.salonService.deleteSalon(Number(id));
            if(!data) return res.status(404).json({ msg: 'salon not found' });
            res.status(200).json( data );
        } catch (error) {
            res.status(500).json({ msg: 'Internal server error' });
        }
    };

    public getReservationsBySalon = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const reservations = await this.salonService.getReservationsBySalon(+id);
            if(!reservations?.length) return res.status(404).json({ message: 'Reservations not found by salon' });

            res.status(200).json({ reservations });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Talk to administrator' });
        }
    }
     
};