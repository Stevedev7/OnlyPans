import { NextFunction, Request, Response } from 'express';
import { createUser, getUserProfile } from '../services/user.service';
import User from '../interfaces/User.interface';
import { HTTPError } from '../interfaces/HTTPError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName
        }: Omit<User, 'verified' | 'id'> = req.body;

        await createUser({ email, firstName, password, lastName });

        res.status(201).json({ message: `${email} registered successfully.` });
    } catch(e: any){
        if(e.name == 'PrismaClientKnownRequestError'){
            const error: HTTPError = new Error(`Account with email ${req.body.email} already exists.`);
            error.status = 409;
            return next(error);
        } else {
            const error: HTTPError = new Error('Please Provide all required fields.');
            error.status = 400;
            return next(error);
        }
    }
};


export const deleteProfile = async (req : Request, res: Response, next: NextFunction) => {
    try{
        res.json('');
    } catch(error) {
        next(error);
    }
};

export const getProfile = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        console.log(id);
        const profile = await getUserProfile(Number(id));
        if(!profile){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ ...profile });
    } catch(e){
        next(e);
    }
};

export default {
    register,
    deleteProfile,
    getProfile
};

