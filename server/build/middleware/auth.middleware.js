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
exports.isLoggedIn = void 0;
const jwt_1 = require("../utils/jwt");
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            const error = new Error('Unauthorized');
            error.status = 401;
            return next(error);
        }
        const token = authorization.split(' ')[1];
        req.user = (yield (0, jwt_1.verifyToken)(token));
        next();
    }
    catch (e) {
        const error = new Error('Unauthorized');
        error.status = 401;
        return next(error);
    }
});
exports.isLoggedIn = isLoggedIn;
