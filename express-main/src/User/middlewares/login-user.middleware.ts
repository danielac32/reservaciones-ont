import { NextFunction, Request, Response } from "express";

export const loginUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { 
        email, password
    } = req.body;

    
    if(!email || !password || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return res.status(400).json({
        message: 'email, password and direction are required or email format fail'
    });

    next();
};