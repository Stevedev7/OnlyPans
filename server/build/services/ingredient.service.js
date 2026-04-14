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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIngredientByID = exports.findIngredientsByName = exports.findIngredients = void 0;
const db_1 = __importDefault(require("../utils/db"));
const findIngredients = (take, skip) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.ingredient.findMany({
            take,
            skip
        });
    }
    catch (error) {
        throw error;
    }
});
exports.findIngredients = findIngredients;
const findIngredientsByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.ingredient.findMany({
            where: {
                name: {
                    startsWith: name
                }
            }, orderBy: {
                name: 'asc'
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.findIngredientsByName = findIngredientsByName;
const findIngredientByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.ingredient.findUnique({
            where: {
                id
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.findIngredientByID = findIngredientByID;
exports.default = {
    findIngredients: exports.findIngredients,
    findIngredientsByName: exports.findIngredientsByName,
    findIngredientByID: exports.findIngredientByID
};
