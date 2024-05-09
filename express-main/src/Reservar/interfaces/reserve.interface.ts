export interface Reserve {
  startDate: Date;
  endDate: Date;
  requerimiento: string;
  cantidad_persona: number;
  descripcion: string;
  state: string;
  userId: number;
  salonId: number;
  createdAt: Date
}

export enum StatusReserve {
  PENDING = 'PENDING',
  REFUSED = 'REFUSED',
  ACCEPTED = 'ACCEPTED'
};

export type StatusReserveTypes = StatusReserve.ACCEPTED | StatusReserve.PENDING | StatusReserve.REFUSED;