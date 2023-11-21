import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { findAllAllergens, findAllergenById, findAllergenByName } from '../services/allergen.service';
import { HTTPError } from '../interfaces/HTTPError';

export const getAllAllergens = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const allergens = await findAllAllergens();
        res.json({ data: allergens });
    } catch(error){
        next(error);
    }
};

export const getAllergenById = async (req: Request, res: Response, next: NextFunction) => {
    try  {
        const id = Number(req.params.id);
        const allergen = await findAllergenById(id);
        if(!allergen){
            const error: HTTPError = new Error('Not found');
            error.status = 404;
            next(error);
        }
        res.json({ data: allergen });
    } catch(error){
        next(error);
    }
};

export const getAllergenByName = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const search = req.query.q ?? '';
        const allergens = await findAllergenByName(<string>search);
        if(allergens.length == 0){
            const error: HTTPError = new Error('Not found');
            error.status = 404;
            next(error);
        }
        res.json({ data: allergens });
    } catch(error){
        next(error);
    }
};

export default {
    getAllAllergens,
    getAllergenById,
    getAllergenByName
};