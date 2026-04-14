"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRatings = exports.getUserRecipes = exports.putRecipe = exports.deleteRecipeById = exports.getAllRecipes = exports.getRecipesByCourse = exports.getRecipesByDiet = exports.getRecipesByCuisine = exports.getRecipeById = exports.postRecipe = void 0;
const recipe_service_1 = require("../services/recipe.service");
const cuisine_service_1 = require("../services/cuisine.service");
const diet_service_1 = require("../services/diet.service");
const client_1 = require("@prisma/client");
const user_service_1 = require("../services/user.service");
const postRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let chef = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        let { title, description, steps, cuisine, ingredients, diet, tags, allergen, course, images } = req.body;
        steps = {
            create: steps.map((step, index) => {
                return {
                    stepNumber: ++index,
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
            create: tags.map((id) => ({ tag: { connect: { id: Number(id) } } }))
        };
        ingredients = {
            create: ingredients.map((ingredient) => ({
                ingredient: {
                    connect: { id: Number(ingredient.id) }
                },
                quantity: Number(ingredient.quantity),
                unit: {
                    connect: { id: Number(ingredient.unit) }
                }
            }))
        };
        allergen = {
            connect: allergen.map((al) => ({ id: al }))
        };
        images = {
            create: images.map((url) => ({ url }))
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
        const recipe = yield (0, recipe_service_1.createRecipe)(data);
        res.status(201).json({ data: recipe });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.postRecipe = postRecipe;
const getRecipeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const recipe = yield (0, recipe_service_1.findRecipeById)(id);
        if (!recipe) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const ingredients = recipe.ingredients.map((ingredient) => ({ id: ingredient.ingredient.id, name: ingredient.ingredient.name, unit: ingredient.unit.name, unitId: ingredient.unit.id, quantity: ingredient.quantity }));
        const tags = recipe.tags.map(({ tag }) => ({ id: tag.id, text: tag.text }));
        const steps = recipe.steps.map(({ step }) => step);
        res.json({ data: Object.assign(Object.assign({}, recipe), { ingredients, tags, steps }) });
    }
    catch (error) {
        next(error);
    }
});
exports.getRecipeById = getRecipeById;
const getRecipesByCuisine = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const cuisineId = Number(req.params.id);
        const cuisine = yield (0, cuisine_service_1.findCuisineById)(cuisineId);
        if (!cuisine) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const recipes = yield (0, recipe_service_1.findRecipesbyCuisine)(cuisineId, limit, skip);
        res.json({ data: recipes.result, cuisine, count: recipes.count });
    }
    catch (error) {
        next(error);
    }
});
exports.getRecipesByCuisine = getRecipesByCuisine;
const getRecipesByDiet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const dietId = Number(req.params.id);
        const diet = yield (0, diet_service_1.findDietById)(dietId);
        if (!diet) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const recipes = yield (0, recipe_service_1.findRecipesbyDiet)(dietId, limit, skip);
        res.json({ data: recipes.result, diet, count: recipes.count });
    }
    catch (error) {
        next(error);
    }
});
exports.getRecipesByDiet = getRecipesByDiet;
const getRecipesByCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const course = req.params.course;
        if (!Object.values(client_1.Course).includes(course)) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const recipes = yield (0, recipe_service_1.findRecipesbyCourse)(course, limit, skip);
        res.json({ data: recipes.result, count: recipes.count });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getRecipesByCourse = getRecipesByCourse;
const getAllRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const search = String(req.query.searchValue) || '';
        const { diets, allergens, courses } = req.query;
        const skip = ((page - 1) * limit);
        let flag = false;
        let filterQuery = {
            where: {
                AND: []
            }
        };
        if (search.length > 0) {
            flag = true;
            filterQuery = Object.assign(Object.assign({}, filterQuery), { where: Object.assign(Object.assign({}, filterQuery.where), { AND: [
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
                    ] }) });
        }
        if (diets) {
            flag = true;
            if (typeof diets == 'string') {
                filterQuery = Object.assign(Object.assign({}, filterQuery), { where: Object.assign(Object.assign({}, filterQuery.where), { AND: [
                            ...filterQuery.where.AND,
                            {
                                diet: {
                                    name: diets
                                }
                            }
                        ] }) });
            }
            if (Array.isArray(diets)) {
                filterQuery = Object.assign(Object.assign({}, filterQuery), { where: Object.assign(Object.assign({}, filterQuery.where), { AND: [
                            ...filterQuery.where.AND,
                            {
                                diet: {
                                    name: {
                                        in: diets
                                    }
                                }
                            }
                        ] }) });
            }
        }
        if (allergens) {
            flag = true;
            if (typeof allergens == 'string') {
                filterQuery = Object.assign(Object.assign({}, filterQuery), { where: Object.assign(Object.assign({}, filterQuery.where), { AND: [
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
                        ] }) });
            }
            if (Array.isArray(allergens)) {
                filterQuery = Object.assign(Object.assign({}, filterQuery), { where: Object.assign(Object.assign({}, filterQuery.where), { AND: [
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
                        ] }) });
            }
        }
        if (courses) {
            flag = true;
            if (typeof courses == 'string') {
                filterQuery = Object.assign(Object.assign({}, filterQuery), { where: Object.assign(Object.assign({}, filterQuery.where), { AND: [
                            ...filterQuery.where.AND,
                            {
                                course: courses
                            }
                        ] }) });
            }
            if (Array.isArray(courses)) {
                filterQuery = Object.assign(Object.assign({}, filterQuery), { where: Object.assign(Object.assign({}, filterQuery.where), { AND: [
                            ...filterQuery.where.AND,
                            {
                                course: {
                                    in: courses
                                }
                            }
                        ] }) });
            }
        }
        const recipes = yield (0, recipe_service_1.findRecipes)(limit, skip, filterQuery.where);
        res.json({ data: recipes.result, count: recipes.count });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllRecipes = getAllRecipes;
const deleteRecipeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user } = req;
        const recipeExists = yield (0, recipe_service_1.findRecipeById)(Number(id));
        if (!recipeExists) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        if (recipeExists.chef.id != (user === null || user === void 0 ? void 0 : user.id)) {
            const error = new Error('Forbidden');
            error.status = 403;
            return next(error);
        }
        yield (0, recipe_service_1.deleteRecipe)(Number(id));
        res.json({ message: 'Recipe deleted', data: recipeExists });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteRecipeById = deleteRecipeById;
const putRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user } = req;
        const steps = req.body.steps;
        const { title, description, course, cuisine, diet, ingredients, tags, allergen } = req.body;
        const recipeExists = yield (0, recipe_service_1.findRecipeById)(Number(id));
        if (!recipeExists) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        if (recipeExists.chef.id != (user === null || user === void 0 ? void 0 : user.id)) {
            const error = new Error('Forbidden');
            error.status = 403;
            return next(error);
        }
        const newSteps = steps.map((step, index) => ({ stepNumber: index + 1, step }));
        yield (0, recipe_service_1.updateRecipeSteps)(newSteps, Number(id));
        yield (0, recipe_service_1.updateRecipe)(title, description, course, cuisine, diet, Number(id));
        const _ingredients = {
            create: ingredients.map((ingredient) => ({
                ingredient: {
                    connect: { id: Number(ingredient.id) }
                },
                quantity: Number(ingredient.quantity),
                unit: {
                    connect: { id: Number(ingredient.unit) }
                }
            }))
        };
        yield (0, recipe_service_1.updateRecipeIngredients)(_ingredients, Number(id));
        yield (0, recipe_service_1.updateRecipeTags)(tags, Number(id));
        yield (0, recipe_service_1.updateRecipeAllergens)(allergen, Number(id), recipeExists.allergen);
        const updatedRecipe = yield (0, recipe_service_1.findRecipeById)(Number(id));
        res.json({ message: 'Recipe updated', data: updatedRecipe });
    }
    catch (error) {
        next(error);
    }
});
exports.putRecipe = putRecipe;
const getUserRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const chef = yield (0, user_service_1.getUserProfile)(Number(id));
        if (!chef) {
            const error = new Error('User Not Found');
            error.status = 404;
            return next(error);
        }
        const recipes = yield (0, recipe_service_1.fetchUserRecipes)(Number(id), limit, skip);
        res.json({ data: recipes.result, count: recipes.count });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserRecipes = getUserRecipes;
const getAverageRatings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const recipe = yield (0, recipe_service_1.findRecipeById)(id);
        if (!recipe) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const ratings = yield (0, recipe_service_1.findAverageRatings)(id);
        res.json({ data: ratings });
    }
    catch (error) {
        next(error);
    }
});
exports.getAverageRatings = getAverageRatings;
exports.default = {
    postRecipe: exports.postRecipe,
    getRecipeById: exports.getRecipeById,
    getRecipesByDiet: exports.getRecipesByDiet,
    getAllRecipes: exports.getAllRecipes,
    deleteRecipeById: exports.deleteRecipeById,
    getRecipesByCourse: exports.getRecipesByCourse,
    putRecipe: exports.putRecipe,
    getUserRecipes: exports.getUserRecipes
};
