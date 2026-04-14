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
exports.getAllergenByName = exports.getAllergenById = exports.getAllAllergens = void 0;
const allergen_service_1 = require("../services/allergen.service");
const getAllAllergens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allergens = yield (0, allergen_service_1.findAllAllergens)();
        res.json({ data: allergens });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAllergens = getAllAllergens;
const getAllergenById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const allergen = yield (0, allergen_service_1.findAllergenById)(id);
        if (!allergen) {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
        }
        res.json({ data: allergen });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllergenById = getAllergenById;
const getAllergenByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.q) !== null && _a !== void 0 ? _a : '';
        const allergens = yield (0, allergen_service_1.findAllergenByName)(search);
        if (allergens.length == 0) {
            const error = new Error('Not found');
            error.status = 404;
            next(error);
        }
        res.json({ data: allergens });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllergenByName = getAllergenByName;
exports.default = {
    getAllAllergens: exports.getAllAllergens,
    getAllergenById: exports.getAllergenById,
    getAllergenByName: exports.getAllergenByName
};
