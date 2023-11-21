import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { findRecipeIngredients } from '../services/recipe.service';
import { HTTPError } from '../interfaces/HTTPError';

export const getNutrition = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const recipeIngredients = await findRecipeIngredients(Number(id));
        if(! recipeIngredients){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }

        res.json({ message: 'Yet to implement' });
    } catch(error){
        next(error);
    }
};