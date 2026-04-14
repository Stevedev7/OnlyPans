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
exports.deleteIngredientFromShoppingList = exports.addIngredientToList = exports.getShoppingList = void 0;
const shoppingList_service_1 = require("../services/shoppingList.service");
const ingredient_service_1 = require("../services/ingredient.service");
const getShoppingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        let shoppingList = yield (0, shoppingList_service_1.findShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        if (!shoppingList) {
            yield (0, shoppingList_service_1.createShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        }
        shoppingList = yield (0, shoppingList_service_1.findShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        res.json({ data: shoppingList });
    }
    catch (error) {
        next(error);
    }
});
exports.getShoppingList = getShoppingList;
const addIngredientToList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const ingredient = req.body.ingredient;
        const ingredientExists = yield (0, ingredient_service_1.findIngredientByID)(ingredient);
        if (!ingredientExists) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        let shoppingList = yield (0, shoppingList_service_1.findShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        if (!shoppingList) {
            yield (0, shoppingList_service_1.createShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        }
        shoppingList = yield (0, shoppingList_service_1.findShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        const ingredientExistsInList = yield (0, shoppingList_service_1.checkIngredientInShoppingList)(Number(shoppingList === null || shoppingList === void 0 ? void 0 : shoppingList.id), ingredient);
        if (!ingredientExistsInList) {
            yield (0, shoppingList_service_1.addIngredientToShoppingList)(Number(shoppingList === null || shoppingList === void 0 ? void 0 : shoppingList.id), ingredient);
        }
        shoppingList = yield (0, shoppingList_service_1.findShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        res.json({ message: 'Ingredient added', data: shoppingList });
    }
    catch (error) {
        next(error);
    }
});
exports.addIngredientToList = addIngredientToList;
const deleteIngredientFromShoppingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const ingredient = Number(req.params.id);
        const ingredientExists = yield (0, ingredient_service_1.findIngredientByID)((ingredient));
        if (!ingredientExists) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        let shoppingList = yield (0, shoppingList_service_1.findShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        if (!shoppingList) {
            yield (0, shoppingList_service_1.createShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        }
        shoppingList = yield (0, shoppingList_service_1.findShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        const ingredientExistsInList = yield (0, shoppingList_service_1.checkIngredientInShoppingList)(Number(shoppingList === null || shoppingList === void 0 ? void 0 : shoppingList.id), ingredient);
        if (ingredientExistsInList) {
            yield (0, shoppingList_service_1.removeIngerdientFromShoppingList)(Number(shoppingList === null || shoppingList === void 0 ? void 0 : shoppingList.id), ingredient);
        }
        shoppingList = yield (0, shoppingList_service_1.findShoppingList)(Number(user === null || user === void 0 ? void 0 : user.id));
        res.json({ message: 'Ingredient removed', data: shoppingList });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteIngredientFromShoppingList = deleteIngredientFromShoppingList;
exports.default = {
    getShoppingList: exports.getShoppingList,
    addIngredientToList: exports.addIngredientToList,
    deleteIngredientFromShoppingList: exports.deleteIngredientFromShoppingList
};
