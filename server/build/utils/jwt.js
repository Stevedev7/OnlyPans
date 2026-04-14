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
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'this is a very confidential secret key.';
const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.sign)(payload, JWT_SECRET, {
            expiresIn: '3h'
        }, (error, token) => {
            if (error) {
                return reject(error);
            }
            return resolve(token);
        });
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(token, JWT_SECRET, (error, payload) => {
            if (error) {
                return reject(error);
            }
            return resolve(payload);
        });
    });
});
exports.verifyToken = verifyToken;
exports.default = {
    generateToken: exports.generateToken,
    verifyToken: exports.verifyToken
};
