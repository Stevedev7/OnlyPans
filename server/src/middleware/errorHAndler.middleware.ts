import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { HTTPError } from '../interfaces/HTTPError';




// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = async (error: HTTPError, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.status || 500).json({ error: { message: error.message ||  'Something went wrong.' }, data: error.data || null });
};