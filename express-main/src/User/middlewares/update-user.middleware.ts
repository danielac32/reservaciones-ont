import { NextFunction, Request, Response } from "express";

export const updateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
     const requiredFields = [
        'name',
        'email',
        'password',
        'directionId',
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

