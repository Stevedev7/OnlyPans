import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { findAllDiets, findDietById, findDietByName } from '../services/diet.service';
import { HTTPError } from '../interfaces/HTTPError';

export const getAllDiets = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const diets = await findAllDiets();
        if(!diets){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: diets });
    } catch(error){
        next(error);
    }
};

export const getDietById = async (req: Request, res: Response, next: NextFunction) => {
    try  {
        const id = Number(req.params.id);
        const diet = await findDietById(id);
        if(!diet){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: diet });
    } catch(error){
        console.log(error);
        next(error);
    }
};

export const getDietByName = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const search = req.query.q ?? '';
        const diets = await findDietByName(<string>search);
        if(diets.length == 0){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: diets });
    } catch(error){
        console.log(error);
        next(error);
    }
};

export default {
    getAllDiets,
    getDietById,
    getDietByName
};