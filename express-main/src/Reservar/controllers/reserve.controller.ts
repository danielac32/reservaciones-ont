import { Request, Response } from 'express';
import { ReservationServices } from '../services/reservation.service';
import { FilterQueryReservation } from '../interfaces/filter-querys';
import { StatusReserveTypes } from '../interfaces/reserve.interface';

export class ReservationController {
    constructor (private reservationServices: ReservationServices) {}

    public create = async(req: Request, res: Response) => {
        try {
            const body = req.body;
            const newReservation = await this.reservationServices.createReservation(body);

            res.status(201).json({
                message: 'Reservation created',
                reservation: newReservation
            });
        } catch (error) {
            console.log('ERROR CREATE RESERVATION -> ', error,req.body);
            res.status(500).json({ error: 'Talk to administrator' });
        }
    };
    public read = async(req: Request, res: Response) => {
        const { state, endDate, startDate ,limit = 10, page = 1} = req.query;
        const filter: FilterQueryReservation = {};
        filter.state = state as StatusReserveTypes;

        try {
            const resp = await this.reservationServices.getReservations(filter, +page, +limit);
            res.status(200).json({
                reservations: resp?.reservations,
                meta: resp?.meta
            });
        } catch (error) {
            res.status(500)
        }
    }
    public readById = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const reservation = await this.reservationServices.getReservation(Number(id));
            console.log(reservation)
            res.status(200).json({
                reservation
            });
        } catch (error) {
            res.status(500)
        }
    }
    public update = async(req: Request, res: Response) => {
        try {
            const body = req.body;
            const { id } = req.params;
            const data = await this.reservationServices.updateReservation(Number(id),body);
            if(!data) return res.status(404).json({ msg: 'Reservation not found' });
            res.status(200).json( data );
        } catch (error) {
            res.status(500).json({ msg: 'Internal server error' });
        }
    };
    public delete = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = await this.reservationServices.deleteReservation(Number(id));
            if(!data) return res.status(404).json({ msg: 'Reservation not found' });
            res.status(200).json( data );
        } catch (error) {
            res.status(500).json({ msg: 'Internal server error' });
        }
    };
    public changeStatusInReservation = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const reservation = await this.reservationServices.changeReservationStatus(+id, status);
            res.status(200).json({ reservation });
        } catch (error) {
            res.status(500)
        }
    };
};