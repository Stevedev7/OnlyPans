import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { findIngredientByID, findIngredients, findIngredientsByName } from '../services/ingredient.service';
import { HTTPError } from '../interfaces/HTTPError';
export const getIngredients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const ingredients = await findIngredients(limit, skip );
        res.json({ data: ingredients, limit, page });
    } catch(error){
        next(error);
    }
};

export const searchIngredients = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const search = req.query.q ?? '';
        const ingredients = await findIngredientsByName(search as string);
        if(ingredients.length == 0){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: ingredients, searchTerm: search });
    } catch(error){
        next(error);
    }
};


export const getIngredientByID = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = Number(req.params.id);
        const ingredient = await findIngredientByID(id);
        if(!ingredient){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: ingredient });
    } catch(error){
        next(error);
    }
};