import { StatusReserveTypes } from "./reserve.interface";

export interface FilterQueryReservation {
    state?: StatusReserveTypes;
    startDate?: Date;
    endDate?: Date;
};