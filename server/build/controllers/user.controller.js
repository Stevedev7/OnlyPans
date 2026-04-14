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
exports.getProfile = exports.deleteProfile = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName } = req.body;
        yield (0, user_service_1.createUser)({ email, firstName, password, lastName });
        res.status(201).json({ message: `${email} registered successfully.` });
    }
    catch (e) {
        if (e.name == 'PrismaClientKnownRequestError') {
            const error = new Error(`Account with email ${req.body.email} already exists.`);
            error.status = 409;
            return next(error);
        }
        else {
            const error = new Error('Please Provide all required fields.');
            error.status = 400;
            return next(error);
        }
    }
});
exports.register = register;
const deleteProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json('');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProfile = deleteProfile;
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const profile = yield (0, user_service_1.getUserProfile)(Number(id));
        if (!profile) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json(Object.assign({}, profile));
    }
    catch (e) {
        next(e);
    }
});
exports.getProfile = getProfile;
exports.default = {
    register: exports.register,
    deleteProfile: exports.deleteProfile,
    getProfile: exports.getProfile
};
