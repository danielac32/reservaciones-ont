import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userServices } from '../../User/dependencies';

export const validateJwt = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
   // const token = req.header('token');
    console.log(token)
    if(!token) return res.status(401).json({ msg: 'Unathorized' });

    try {
        const { email } = <JwtPayload>jwt.verify( token, process.env.JWT_KEY! );
        const user = await userServices.getUser(email);
        if(!user) return res.status(404).json({ msg: 'User not found' });

    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }

    next();
};