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
exports.getNutrition = void 0;
const recipe_service_1 = require("../services/recipe.service");
const getNutrition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const recipeIngredients = yield (0, recipe_service_1.findRecipeIngredients)(Number(id));
        if (!recipeIngredients) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ message: 'Yet to implement' });
    }
    catch (error) {
        next(error);
    }
});
exports.getNutrition = getNutrition;
