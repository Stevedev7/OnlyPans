import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { findRecipeById } from '../services/recipe.service';
import { createReview, findReviewByUserAndRecipe, deleteReviewById, findReviewById, findReviewsByRecipeId } from '../services/review.service';
import { HTTPError } from '../interfaces/HTTPError';

export const postReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id ?? 0;
        const recipeExists = await findRecipeById(Number(id));
        if(!recipeExists){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const reviewedByUser = await findReviewByUserAndRecipe(recipeExists.id, userId);
        if(reviewedByUser !== null){
            const error: HTTPError = new Error('Already rated');
            error.status = 409;
            error.data = reviewedByUser;
            return next(error);
        }
        const { review, rating } = req.body;
        if(rating == 0){
            const error: HTTPError = new Error('Please provide a rating.');
            error.status = 400;
            return next(error);
        }
        await createReview({ rating, review }, recipeExists.id, userId);
        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id, reviewId } = req.params;
        const userId = req.user?.id ?? 0;
        const recipeExists = await findRecipeById(Number(id));
        if(!recipeExists){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const reviewExists = await findReviewById(Number(reviewId));
        if(!reviewExists){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const reviewedByUser = await findReviewByUserAndRecipe(recipeExists.id, userId);
        if(!reviewedByUser){
            const error: HTTPError = new Error('Unauthorized');
            error.status = 401;
            return next(error);
        }
        if(reviewedByUser.id !== Number(reviewId)){
            const error: HTTPError = new Error('Bad Request');
            error.status = 400;
            error.data = { reviewedByUser, reviewId };
            return next(error);
        }
        await deleteReviewById(Number(reviewId));
        res.status(200).json({ message: 'Review deleted', data:reviewedByUser });
    } catch(error){
        next(error);
    }
};

export const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const { id } = req.params;
        const recipe = findRecipeById(Number(id));
        if(!recipe){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            throw error;
        }
        const reviews = await findReviewsByRecipeId(Number(id), limit, skip);
        res.status(200).json({ data: reviews.result, count: reviews.count });
    } catch(error){
        next(error);
    }
};

export default {
    postReview,
    deleteReview,
    getReview
};