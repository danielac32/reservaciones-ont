import { NextFunction, Request, Response } from "express";

export const createReserveMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const requiredFields = [
        'startDate',
        'endDate',
        'requerimiento',
        'cantidad_persona',
        'descripcion',
        'userId',
        'salonId'
    ];
  const missingFields: string[] = [];

  requiredFields.forEach(field => {
    if (!req.body[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `The following fields are required: ${ missingFields.join(', ') }`
    });
  }

  next();
};