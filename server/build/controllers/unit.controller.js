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
exports.getUnitByName = exports.getUnitById = exports.getAllUnits = void 0;
const unit_service_1 = require("../services/unit.service");
const getAllUnits = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const units = yield (0, unit_service_1.findAllUnits)();
        res.json({ data: units });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUnits = getAllUnits;
const getUnitById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const unit = yield (0, unit_service_1.findUnitById)(id);
        if (!unit) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: unit });
    }
    catch (error) {
        next(error);
    }
});
exports.getUnitById = getUnitById;
const getUnitByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.q) !== null && _a !== void 0 ? _a : '';
        const units = yield (0, unit_service_1.findUnitByName)(search);
        if (units.length == 0) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: units });
    }
    catch (error) {
        next(error);
    }
});
exports.getUnitByName = getUnitByName;
exports.default = {
    getAllUnits: exports.getAllUnits,
    getUnitById: exports.getUnitById,
    getUnitByName: exports.getUnitByName
};
