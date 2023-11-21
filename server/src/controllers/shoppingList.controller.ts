import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { addIngredientToShoppingList, checkIngredientInShoppingList, createShoppingList, findShoppingList, removeIngerdientFromShoppingList } from '../services/shoppingList.service';
import { findIngredientByID } from '../services/ingredient.service';
import { HTTPError } from '../interfaces/HTTPError';
export const getShoppingList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        let shoppingList = await findShoppingList(Number(user?.id));
        if(!shoppingList){
            await createShoppingList(Number(user?.id));
        }
        shoppingList = await findShoppingList(Number(user?.id));
        res.json({ data: shoppingList });
    } catch(error){
        next(error);
    }
};

export const addIngredientToList = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const user = req.user;
        const ingredient = req.body.ingredient;
        const ingredientExists = await findIngredientByID(ingredient);
        if(!ingredientExists){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        let shoppingList = await findShoppingList(Number(user?.id));
        if(!shoppingList){
            await createShoppingList(Number(user?.id));
        }
        shoppingList = await findShoppingList(Number(user?.id));
        const ingredientExistsInList = await checkIngredientInShoppingList(Number(shoppingList?.id), ingredient);
        if(!ingredientExistsInList){
            await addIngredientToShoppingList(Number(shoppingList?.id), ingredient);
        }
        shoppingList = await findShoppingList(Number(user?.id));
        res.json({ message: 'Ingredient added', data: shoppingList });
    } catch(error){
        next(error);
    }
};

export const deleteIngredientFromShoppingList = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const user = req.user;
        const ingredient = Number(req.params.id);
        const ingredientExists = await findIngredientByID((ingredient));
        if(!ingredientExists){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        let shoppingList = await findShoppingList(Number(user?.id));
        if(!shoppingList){
            await createShoppingList(Number(user?.id));
        }
        shoppingList = await findShoppingList(Number(user?.id));
        const ingredientExistsInList = await checkIngredientInShoppingList(Number(shoppingList?.id), ingredient);
        if(ingredientExistsInList){
            await removeIngerdientFromShoppingList(Number(shoppingList?.id), ingredient);
        }
        shoppingList = await findShoppingList(Number(user?.id));
        res.json({ message: 'Ingredient removed', data: shoppingList });
    } catch(error){
        next(error);
    }
};

export default {
    getShoppingList,
    addIngredientToList,
    deleteIngredientFromShoppingList
};