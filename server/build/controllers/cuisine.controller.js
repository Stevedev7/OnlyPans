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
exports.getCuisineByName = exports.getCuisineById = exports.getAllCuisines = void 0;
const cuisine_service_1 = require("../services/cuisine.service");
const getAllCuisines = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cuisines = yield (0, cuisine_service_1.findAllCuisines)();
        res.json({ data: cuisines });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCuisines = getAllCuisines;
const getCuisineById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const cuisine = yield (0, cuisine_service_1.findCuisineById)(id);
        if (!cuisine) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: cuisine });
    }
    catch (error) {
        next(error);
    }
});
exports.getCuisineById = getCuisineById;
const getCuisineByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.q) !== null && _a !== void 0 ? _a : '';
        const cuisines = yield (0, cuisine_service_1.findCuisineByName)(search);
        if (cuisines.length == 0) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: cuisines });
    }
    catch (error) {
        next(error);
    }
});
exports.getCuisineByName = getCuisineByName;
exports.default = {
    getAllCuisines: exports.getAllCuisines,
    getCuisineById: exports.getCuisineById,
    getCuisineByName: exports.getCuisineByName
};
