import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { verifyToken } from '../utils/jwt';
import User from '../interfaces/User.interface';
import { HTTPError } from '../interfaces/HTTPError';

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const authorization = req.headers.authorization;
        if (!authorization){
            const error: HTTPError = new Error('Unauthorized');
            error.status = 401;
            return next(error);
        }
        const token: string = authorization.split(' ')[1];
        req.user = await verifyToken(token) as Omit<User, 'password'>;
        next();
    } catch(e){
        const error: HTTPError = new Error('Unauthorized');
        error.status = 401;
        return next(error);
    }
};