import { NextFunction, Request, Response } from 'express';
import { getUserByEmail } from '../services/user.service';
import { comparePassword } from '../utils/password';
import { generateToken, verifyToken } from '../utils/jwt';
import User from '../interfaces/User.interface';
import { HTTPError } from '../interfaces/HTTPError';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        
        const user = await getUserByEmail(email);
        
        if(! user){
            const error: HTTPError = new Error('Incorrect credentials.');
            error.status = 401;
            return next(error);
        }
        if(!await comparePassword(password, user.password)){
            const error: HTTPError = new Error('Incorrect credentials.');
            error.status = 401;
            return next(error);
        }
        const token = await  generateToken(user.UserProfile);
        res.json({ token });
    } catch(error){
        next(error);
    }
};

export const verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization){
            const error: HTTPError = new Error('Unauthorized');
            error.status = 401;
            return next(error);
        }
        const token: string = authorization.split(' ')[1];
        const valid = await verifyToken(token) as Omit<User, 'password'>;
        res.json({ data: { valid } });
    } catch(e: any){
        const error: HTTPError = new Error('Unauthorized');
        error.status = 401;
        return next(error);
    }
};

export default {
    login,
    verify
};