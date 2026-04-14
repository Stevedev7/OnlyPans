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
exports.findCuisineByName = exports.findCuisineById = exports.findAllCuisines = void 0;
const db_1 = __importDefault(require("../utils/db"));
const findAllCuisines = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.cuisine.findMany();
    }
    catch (error) {
        throw error;
    }
});
exports.findAllCuisines = findAllCuisines;
const findCuisineById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.cuisine.findUnique({
            where: {
                id
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.findCuisineById = findCuisineById;
const findCuisineByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.cuisine.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.findCuisineByName = findCuisineByName;
exports.default = {
    findAllCuisines: exports.findAllCuisines,
    findCuisineById: exports.findCuisineById,
    findCuisineByName: exports.findCuisineByName
};
