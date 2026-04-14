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
exports.isFavorite = exports.removeRecipeFromFavorites = exports.addRecipeToFavorites = exports.getFavorites = void 0;
const collection_service_1 = require("../services/collection.service");
const recipe_service_1 = require("../services/recipe.service");
const getFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const favorites = yield (0, collection_service_1.findFavorites)(Number(id));
        if (!favorites) {
            yield (0, collection_service_1.createCollection)({ name: 'favorites', user: { connect: { id: Number(id) } } });
        }
        const recipes = yield (0, collection_service_1.getFavoriteRecipes)(Number(id), limit, skip);
        res.json({ data: recipes.result, count: recipes.count });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getFavorites = getFavorites;
const addRecipeToFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const recipeId = req.body.id;
        const recipe = yield (0, recipe_service_1.findRecipeById)(recipeId);
        if (!recipe) {
            console.log(recipe);
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        let favorites = yield (0, collection_service_1.findCollectionByNameAndUser)('favorites', id);
        if (!favorites) {
            yield (0, collection_service_1.createCollection)({ name: 'favorites', user: { connect: { id: Number(id) } } });
        }
        favorites = yield (0, collection_service_1.findFavorites)(Number(id));
        yield (0, collection_service_1.addToCollection)(Number(favorites === null || favorites === void 0 ? void 0 : favorites.id), recipeId);
        res.status(201).json({ message: 'Removed recipe from favorites', data: recipe });
    }
    catch (error) {
        next(error);
    }
});
exports.addRecipeToFavorites = addRecipeToFavorites;
const removeRecipeFromFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const recipeId = req.body.id;
        const recipe = yield (0, recipe_service_1.findRecipeById)(recipeId);
        if (!recipe) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        let favorites = yield (0, collection_service_1.findCollectionByNameAndUser)('favorites', id);
        if (!favorites) {
            yield (0, collection_service_1.createCollection)({ name: 'favorites', user: { connect: { id: Number(id) } } });
        }
        favorites = yield (0, collection_service_1.findFavorites)(Number(id));
        yield (0, collection_service_1.removeFromCollection)(Number(favorites === null || favorites === void 0 ? void 0 : favorites.id), recipeId);
        res.status(201).json({ message: 'Added recipe to favorites.', data: recipe });
    }
    catch (error) {
        next(error);
    }
});
exports.removeRecipeFromFavorites = removeRecipeFromFavorites;
const isFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const recipeId = req.params.id;
        const recipe = yield (0, recipe_service_1.findRecipeById)(Number(recipeId));
        if (!recipe) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const favorites = yield (0, collection_service_1.findCollectionByNameAndUser)('favorites', id);
        if (!favorites) {
            yield (0, collection_service_1.createCollection)({ name: 'favorites', user: { connect: { id: Number(id) } } });
        }
        const foundInFavorites = yield (0, collection_service_1.recipeInFavorites)(Number(id), Number(recipeId));
        let isFavorite = true;
        if (!foundInFavorites) {
            isFavorite = false;
        }
        res.json({ data: isFavorite });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.isFavorite = isFavorite;
exports.default = {
    getFavorites: exports.getFavorites,
    addRecipeToFavorites: exports.addRecipeToFavorites,
    removeRecipeFromFavorites: exports.removeRecipeFromFavorites,
    isFavorite: exports.isFavorite
};
