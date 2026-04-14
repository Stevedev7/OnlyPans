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
exports.removeIngerdientFromShoppingList = exports.checkIngredientInShoppingList = exports.addIngredientToShoppingList = exports.createShoppingList = exports.findShoppingList = void 0;
const db_1 = __importDefault(require("../utils/db"));
const findShoppingList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.shoppingList.findFirst({
        where: {
            user: {
                id
            }
        },
        select: {
            id: true,
            ingredients: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    });
});
exports.findShoppingList = findShoppingList;
const createShoppingList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.shoppingList.create({
        data: {
            user: {
                connect: {
                    id
                }
            }
        }
    });
});
exports.createShoppingList = createShoppingList;
const addIngredientToShoppingList = (id, ingredient) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.shoppingList.update({
        where: {
            id
        },
        data: {
            ingredients: {
                connect: {
                    id: ingredient
                }
            }
        }
    });
});
exports.addIngredientToShoppingList = addIngredientToShoppingList;
const checkIngredientInShoppingList = (id, ingredient) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.shoppingList.findFirst({
        where: {
            id,
            ingredients: {
                some: {
                    id: ingredient
                }
            }
        }
    });
});
exports.checkIngredientInShoppingList = checkIngredientInShoppingList;
const removeIngerdientFromShoppingList = (id, ingredient) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.shoppingList.update({
        where: {
            id
        },
        data: {
            ingredients: {
                disconnect: {
                    id: ingredient
                }
            }
        }
    });
});
exports.removeIngerdientFromShoppingList = removeIngerdientFromShoppingList;
exports.default = {
    findShoppingList: exports.findShoppingList,
    createShoppingList: exports.createShoppingList,
    addIngredientToShoppingList: exports.addIngredientToShoppingList,
    checkIngredientInShoppingList: exports.checkIngredientInShoppingList,
    removeIngerdientFromShoppingList: exports.removeIngerdientFromShoppingList
};
