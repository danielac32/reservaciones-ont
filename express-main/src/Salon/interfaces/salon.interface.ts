import { Reserve } from "../../Reservar/interfaces/reserve.interface";

export interface Salon {
    id?: number;
    name: string;
    reservations?: Reserve[];
};

 