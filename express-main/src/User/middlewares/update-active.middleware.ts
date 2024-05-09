import { NextFunction, Request, Response } from "express";

export const UpdateActiveUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { 
        isActive
    } = req.body;

    console.log(isActive)
    if(!isActive) return res.status(400).json({
        message: 'isActive are required '
    });

    next();
};