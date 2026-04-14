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
exports.findAllTags = exports.findTagsByTextAndReturnIds = exports.findTagByText = exports.searchTags = exports.createTags = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createTags = (tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.tag.createMany({
            data: tags,
            skipDuplicates: true
        });
    }
    catch (error) {
        throw error;
    }
});
exports.createTags = createTags;
const searchTags = (text, take, skip) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.tag.findMany({
            where: {
                text: {
                    startsWith: text
                }
            },
            take,
            skip
        });
    }
    catch (error) {
        throw error;
    }
});
exports.searchTags = searchTags;
const findTagByText = (text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.tag.findFirst({
            where: {
                text: {
                    startsWith: text
                }
            },
            orderBy: {
                text: 'asc'
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.findTagByText = findTagByText;
const findTagsByTextAndReturnIds = (tags) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tagIds = [];
        for (const { text } of tags) {
            const tag = (_a = (yield db_1.default.tag.findFirst({
                select: {
                    id: true
                },
                where: {
                    text
                }
            }))) === null || _a === void 0 ? void 0 : _a.id;
            tagIds.push(tag);
        }
        return tagIds;
    }
    catch (error) {
        throw error;
    }
});
exports.findTagsByTextAndReturnIds = findTagsByTextAndReturnIds;
const findAllTags = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.tag.findMany();
    }
    catch (error) {
        throw error;
    }
});
exports.findAllTags = findAllTags;
exports.default = {
    createTags: exports.createTags,
    findTagByText: exports.findTagByText,
    searchTags: exports.searchTags,
    findAllTags: exports.findAllTags
};
