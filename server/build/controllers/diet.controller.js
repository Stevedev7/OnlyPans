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
exports.getDietByName = exports.getDietById = exports.getAllDiets = void 0;
const diet_service_1 = require("../services/diet.service");
const getAllDiets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diets = yield (0, diet_service_1.findAllDiets)();
        if (!diets) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: diets });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllDiets = getAllDiets;
const getDietById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const diet = yield (0, diet_service_1.findDietById)(id);
        if (!diet) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: diet });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getDietById = getDietById;
const getDietByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.q) !== null && _a !== void 0 ? _a : '';
        const diets = yield (0, diet_service_1.findDietByName)(search);
        if (diets.length == 0) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: diets });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getDietByName = getDietByName;
exports.default = {
    getAllDiets: exports.getAllDiets,
    getDietById: exports.getDietById,
    getDietByName: exports.getDietByName
};
