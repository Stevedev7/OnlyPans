import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { addToCollection, createCollection, findCollectionByNameAndUser, findFavorites, getFavoriteRecipes, recipeInFavorites, removeFromCollection } from '../services/collection.service';
import { findRecipeById } from '../services/recipe.service';
import { HTTPError } from '../interfaces/HTTPError';

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const favorites = await findFavorites(Number(id));
        if(!favorites) {
            await createCollection({ name: 'favorites', user: { connect: { id: Number(id) } } });
        }
        const recipes = await getFavoriteRecipes(Number(id), limit, skip);
        res.json({ data: recipes.result, count: recipes.count });
    } catch(error) {
        console.log(error);
        next(error);
    }
};

export const addRecipeToFavorites = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?.id;
        const recipeId = req.body.id;
        const recipe = await findRecipeById(recipeId);

        if(!recipe){
            console.log(recipe);
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }

        let favorites = await findCollectionByNameAndUser('favorites', id);

        if(!favorites){
            await createCollection({ name: 'favorites', user: { connect: { id: Number(id) } } });
        }
        favorites = await findFavorites(Number(id));
        await addToCollection(Number(favorites?.id), recipeId);
        res.status(201).json({ message: 'Removed recipe from favorites', data: recipe });
    } catch(error) {
        next(error);
    }
};

export const removeRecipeFromFavorites = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?.id;
        const recipeId = req.body.id;
        const recipe = await findRecipeById(recipeId);

        if(!recipe){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }

        let favorites = await findCollectionByNameAndUser('favorites', id);

        if(!favorites){
            await createCollection({ name: 'favorites', user: { connect: { id: Number(id) } } });
        }
        favorites = await findFavorites(Number(id));
        await removeFromCollection(Number(favorites?.id), recipeId);
        res.status(201).json({ message: 'Added recipe to favorites.', data: recipe });
    } catch(error) {
        next(error);
    }
};

export const isFavorite = async (req:Request, res: Response, next: NextFunction) => {
    try{
        const id = req.user?.id;
        const recipeId = req.params.id;
        const recipe = await findRecipeById(Number(recipeId));

        if(!recipe){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }

        const favorites = await findCollectionByNameAndUser('favorites', id);
        if(!favorites){
            await createCollection({ name: 'favorites', user: { connect: { id: Number(id) } } });
        }
        const foundInFavorites = await recipeInFavorites(Number(id), Number(recipeId));
        let isFavorite = true;
        if(!foundInFavorites){
            isFavorite = false;
        }
        res.json({ data: isFavorite });
    } catch(error){
        console.log(error);
        next(error);
    }
};

export default {
    getFavorites,
    addRecipeToFavorites,
    removeRecipeFromFavorites,
    isFavorite
};