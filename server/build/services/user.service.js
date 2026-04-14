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
exports.getUserByEmail = exports.getUserProfile = exports.createUser = void 0;
const db_1 = __importDefault(require("../utils/db"));
const password_1 = require("../utils/password");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, password } = user;
        const hash = yield (0, password_1.hashPassword)(password);
        yield db_1.default.auth.create({
            data: {
                email,
                password: hash
            }
        });
        yield db_1.default.userProfile.create({
            data: {
                emailId: email,
                firstName,
                lastName,
            }
        });
        return {
            user: {
                email
            }
        };
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const getUserProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.userProfile.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                emailId: true,
                firstName: true,
                lastName: true,
            }
        });
        if (!user) {
            throw Error("Invalid ID");
        }
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserProfile = getUserProfile;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.auth.findUnique({
            where: {
                email
            },
            select: {
                password: true,
                UserProfile: true
            }
        });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserByEmail = getUserByEmail;
exports.default = {
    createUser: exports.createUser,
    getUserProfile: exports.getUserProfile,
    getUserByEmail: exports.getUserByEmail
};
