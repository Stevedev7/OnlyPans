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
exports.verify = exports.login = void 0;
const user_service_1 = require("../services/user.service");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_service_1.getUserByEmail)(email);
        if (!user) {
            const error = new Error('Incorrect credentials.');
            error.status = 401;
            return next(error);
        }
        if (!(yield (0, password_1.comparePassword)(password, user.password))) {
            const error = new Error('Incorrect credentials.');
            error.status = 401;
            return next(error);
        }
        const token = yield (0, jwt_1.generateToken)(user.UserProfile);
        res.json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            const error = new Error('Unauthorized');
            error.status = 401;
            return next(error);
        }
        const token = authorization.split(' ')[1];
        const valid = yield (0, jwt_1.verifyToken)(token);
        res.json({ data: { valid } });
    }
    catch (e) {
        const error = new Error('Unauthorized');
        error.status = 401;
        return next(error);
    }
});
exports.verify = verify;
exports.default = {
    login: exports.login,
    verify: exports.verify
};
