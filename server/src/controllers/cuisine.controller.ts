import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { findAllCuisines, findCuisineById, findCuisineByName } from '../services/cuisine.service';
import { HTTPError } from '../interfaces/HTTPError';

export const getAllCuisines = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cuisines = await findAllCuisines();
        res.json({ data: cuisines });
    } catch(error){
        next(error);
    }
};

export const getCuisineById = async (req: Request, res: Response, next: NextFunction) => {
    try  {
        const id = Number(req.params.id);
        const cuisine = await findCuisineById(id);
        if(!cuisine){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: cuisine });
    } catch(error){
        next(error);
    }
};

export const getCuisineByName = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const search = req.query.q ?? '';
        const cuisines = await findCuisineByName(<string>search);
        if(cuisines.length == 0){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: cuisines });
    } catch(error){
        next(error);
    }
};

export default {
    getAllCuisines,
    getCuisineById,
    getCuisineByName
};