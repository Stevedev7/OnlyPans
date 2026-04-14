"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashPassword = (plainPassword) => {
    return new Promise((resolve, reject) => {
        const salt = crypto_1.default.randomBytes(32).toString('base64');
        crypto_1.default.pbkdf2(plainPassword, salt, 100, 32, 'sha512', (error, hash) => {
            if (error) {
                return reject(error);
            }
            const hashedPassword = salt + ':' + hash.toString('base64');
            resolve(hashedPassword);
        });
    });
};
exports.hashPassword = hashPassword;
const comparePassword = (plainPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const [salt, hash] = hashedPassword.split(':');
        crypto_1.default.pbkdf2(plainPassword, salt, 100, 32, 'sha512', (error, newHash) => {
            if (error) {
                return reject(error);
            }
            resolve(hash == newHash.toString('base64'));
        });
    });
};
exports.comparePassword = comparePassword;
exports.default = {
    hashPassword: exports.hashPassword,
    comparePassword: exports.comparePassword
};
