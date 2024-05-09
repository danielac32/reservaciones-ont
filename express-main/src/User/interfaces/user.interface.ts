export interface User {
    name: string;
    email: string;
    isActive?: boolean;
    rol?:string;
    password: string;
    directionId: number;
};