import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { createRecipe, findRecipeById, findRecipesbyCuisine, findRecipesbyDiet, findRecipes, deleteRecipe, findRecipesbyCourse, updateRecipeSteps, updateRecipe, updateRecipeIngredients, updateRecipeTags, fetchUserRecipes, findAverageRatings, updateRecipeAllergens } from '../services/recipe.service';
import { findCuisineById } from '../services/cuisine.service';
import { findDietById } from '../services/diet.service';
import { HTTPError } from '../interfaces/HTTPError';
import { Course } from '@prisma/client';
import { getUserProfile } from '../services/user.service';

export const postRecipe = async (req: Request, res: Response, next: NextFunction) => {

    try{
        let chef: any = req.user?.id;
        
        let { 
            title,
            description,
            steps,
            cuisine,
            ingredients,
            diet,
            tags,
            allergen,
            course,
            images 
        }: any =   req.body; 

        steps = {
            create: steps.map((step: string, index: number) => {
                return {
                    stepNumber: ++ index,
                    step
                };
            })
        };
        chef = {
            connect: {
                id: chef
            }
        };

        tags = {
            create: tags.map((id: string) => ({ tag: { connect: { id: Number(id) } } }))
        };
        ingredients = {
            create: ingredients.map((ingredient: any) => ({
                ingredient: {
                    connect: { id: Number(ingredient.id) }
                },
                quantity: Number(ingredient.quantity),
                unit : {
                    connect: { id: Number(ingredient.unit) }
                }
            }))
        };
        allergen = {
            connect: allergen.map((al: string) => ({ id: al }))
        };
        images = {
            create: images.map((url: string) => ({ url }))
        };

        diet = {
            connect: {
                id: diet
            }
        };
        cuisine = {
            connect: {
                id: cuisine
            }
        };
        const data = {
            title,
            description,
            steps,
            cuisine,
            diet,
            course,
            tags,
            ingredients,
            allergen,
            images,
            chef
        };

        const recipe = await createRecipe(data);

        res.status(201).json({ data: recipe });
    } catch(error){
        console.log(error);
        next(error);
    }
};


export const getRecipeById = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const id = Number(req.params.id);
        const recipe: any = await findRecipeById(id);
        if(!recipe){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const ingredients = recipe.ingredients.map((ingredient: any) => ({ id: ingredient.ingredient.id, name: ingredient.ingredient.name, unit: ingredient.unit.name, unitId: ingredient.unit.id,quantity: ingredient.quantity }));
        const tags = recipe.tags.map(({ tag }: {tag: any}) => ({ id: tag.id, text: tag.text }));
        const steps: string[]= recipe.steps.map(({ step }: { step: string}) => step);
        res.json({ data: { ...recipe, ingredients, tags, steps } });

    } catch(error){
        next(error);
    }
};

export const getRecipesByCuisine = async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const cuisineId = Number(req.params.id);
        const cuisine = await findCuisineById(cuisineId);
        if(!cuisine){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const recipes = await findRecipesbyCuisine(cuisineId, limit, skip);
        res.json( { data: recipes.result, cuisine, count: recipes.count });
    } catch(error){
        next(error);
    }
};


export const getRecipesByDiet = async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const dietId = Number(req.params.id);
        const diet = await findDietById(dietId);
        if(!diet){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const recipes = await findRecipesbyDiet(dietId, limit, skip);
        res.json( { data: recipes.result, diet, count: recipes.count });
    } catch(error){
        next(error);
    }
};

export const getRecipesByCourse = async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const course = req.params.course as Course;

        if (!Object.values(Course).includes(course as Course)) {
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const recipes = await findRecipesbyCourse(course as Course, limit, skip);
        res.json( { data: recipes.result, count: recipes.count });
    } catch(error){
        console.log(error);
        next(error);
    }
};

export const getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const search = String(req.query.searchValue) || '';
        const { diets, allergens, courses } = req.query;
        const skip = ((page - 1) * limit);
        let flag: boolean = false;
        let filterQuery: any = {
            where: {
                AND: []
            }
        };

        if(search.length > 0){
            flag = true;
            filterQuery = {
                ...filterQuery,
                where: {
                    ...filterQuery.where,
                    AND: [
                        ...filterQuery.where.AND,
                        {
                            OR: [
                                {
                                    title: {
                                        startsWith: search
                                    }
                                },
                                {
                                    description: {
                                        contains: search
                                    }
                                },
                                {
                                    title: {
                                        contains: search
                                    }
                                },
                                {
                                    tags: {
                                        some: {
                                            tag: {
                                                text: {
                                                    contains: search
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
        }
        if(diets){
            flag = true;
            if(typeof diets == 'string'){
                filterQuery = {
                    ...filterQuery,
                    where: {
                        ...filterQuery.where,
                        AND: [
                            ...filterQuery.where.AND,
                            {
                                diet: {
                                    name: diets
                                }
                            }
                        ]
                    }
                };
            }
            if(Array.isArray(diets)){
                filterQuery = {
                    ...filterQuery,
                    where: {
                        ...filterQuery.where,
                        AND: [
                            ...filterQuery.where.AND,
                            {
                                diet: {
                                    name: {
                                        in: diets
                                    }
                                }
                            }
                        ]
                    }
                };
            }
        }

        if(allergens){
            flag = true;
            if(typeof allergens == 'string'){
                filterQuery = {
                    ...filterQuery,
                    where: {
                        ...filterQuery.where,
                        AND: [
                            ...filterQuery.where.AND,
                            {
                                allergen: {
                                    every: {
                                        name: {
                                            not: allergens
                                        }
                                    }
                                }
                            }
                        ]
                    }
                };
            }
            if(Array.isArray(allergens)){
                filterQuery = {
                    ...filterQuery,
                    where: {
                        ...filterQuery.where,
                        AND: [
                            ...filterQuery.where.AND,
                            {
                                allergen: {
                                    every: {
                                        name: {
                                            notIn: allergens
                                        }
                                    }
                                }
                            }
                        ]
                    }
                };
            }
        }
        if(courses){
            flag = true;
            if(typeof courses == 'string'){
                filterQuery = {
                    ...filterQuery,
                    where: {
                        ...filterQuery.where,
                        AND: [
                            ...filterQuery.where.AND,
                            {
                                course: courses
                            }
                        ]
                    }
                };
            }
            if(Array.isArray(courses)){
                filterQuery = {
                    ...filterQuery,
                    where: {
                        ...filterQuery.where,
                        AND: [
                            ...filterQuery.where.AND,
                            {
                                course: {
                                    in: courses
                                }
                            }
                        ]
                    }
                };
            }
        }
        const recipes = await findRecipes(limit, skip, filterQuery.where);

        res.json( { data: recipes.result, count: recipes.count });
    } catch(error){
        console.log(error);
        next(error);
    }
};


export const deleteRecipeById = async (req: Request, res: Response, next: NextFunction)  => {
    try {
        const{ id } = req.params;
        const { user }: any = req;
        const recipeExists: any = await findRecipeById(Number(id));
        if(!recipeExists){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        if(recipeExists.chef.id != user?.id){
            const error: HTTPError = new Error('Forbidden');
            error.status = 403;
            return next(error);
        }
        await deleteRecipe(Number(id));

        res.json({ message: 'Recipe deleted', data: recipeExists });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const putRecipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const{ id } = req.params;
        const { user }: any = req;
        const steps: string[] = req.body.steps;
        const { 
            title, 
            description,
            course,
            cuisine,
            diet,
            ingredients,
            tags,
            allergen
        } : {
            title: string, 
            description: string,
            images: string[],
            course: Course,
            cuisine: number,
            diet: number,
            ingredients: any,
            tags: number[],
            allergen: number[]
        } = req.body;
        const recipeExists: any = await findRecipeById(Number(id));
        if(!recipeExists){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        if(recipeExists.chef.id != user?.id){
            const error: HTTPError = new Error('Forbidden');
            error.status = 403;
            return next(error);
        }
        
        const newSteps = steps.map((step, index) => ({ stepNumber: index + 1, step }));
        await updateRecipeSteps(newSteps, Number(id));
        await updateRecipe(title, description, course, cuisine, diet, Number(id));
        const _ingredients = {
            create: ingredients.map((ingredient: any) => ({
                ingredient: {
                    connect: { id: Number(ingredient.id) }
                },
                quantity: Number(ingredient.quantity),
                unit : {
                    connect: { id: Number(ingredient.unit) }
                }
            }))
        };
        await updateRecipeIngredients(_ingredients, Number(id));
        await updateRecipeTags(tags, Number(id));
        await updateRecipeAllergens(allergen, Number(id), recipeExists.allergen);
        const updatedRecipe: any = await findRecipeById(Number(id));
        res.json({ message: 'Recipe updated', data: updatedRecipe });
    } catch(error){
        next(error);
    }
};

export const getUserRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const chef = await getUserProfile(Number(id));
        if(!chef){
            const error: HTTPError = new Error('User Not Found');
            error.status = 404;
            return next(error);
        }

        const recipes = await fetchUserRecipes(Number(id), limit, skip);

        res.json({ data: recipes.result, count: recipes.count });
    } catch(error){
        next(error);
    }
};

export const getAverageRatings = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = Number(req.params.id);
        const recipe: any = await findRecipeById(id);
        if(!recipe){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const ratings = await findAverageRatings(id);
        res.json({ data: ratings });
    } catch (error){
        next(error);
    }
};

export default {
    postRecipe,
    getRecipeById,
    getRecipesByDiet,
    getAllRecipes,
    deleteRecipeById,
    getRecipesByCourse,
    putRecipe,
    getUserRecipes
};