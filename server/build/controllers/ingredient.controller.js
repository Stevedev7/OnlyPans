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
exports.getIngredientByID = exports.searchIngredients = exports.getIngredients = void 0;
const ingredient_service_1 = require("../services/ingredient.service");
const getIngredients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const ingredients = yield (0, ingredient_service_1.findIngredients)(limit, skip);
        res.json({ data: ingredients, limit, page });
    }
    catch (error) {
        next(error);
    }
});
exports.getIngredients = getIngredients;
const searchIngredients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.q) !== null && _a !== void 0 ? _a : '';
        const ingredients = yield (0, ingredient_service_1.findIngredientsByName)(search);
        if (ingredients.length == 0) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: ingredients, searchTerm: search });
    }
    catch (error) {
        next(error);
    }
});
exports.searchIngredients = searchIngredients;
const getIngredientByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const ingredient = yield (0, ingredient_service_1.findIngredientByID)(id);
        if (!ingredient) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: ingredient });
    }
    catch (error) {
        next(error);
    }
});
exports.getIngredientByID = getIngredientByID;
