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
exports.getCollectionById = exports.getUserCollections = exports.postCollection = void 0;
const collection_service_1 = require("../services/collection.service");
const postCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name } = req.body;
        const collectionExists = yield (0, collection_service_1.findCollectionByNameAndUser)(name, user === null || user === void 0 ? void 0 : user.id);
        if (collectionExists) {
            const error = new Error('Collection exists');
            error.status = 409;
            return next(error);
        }
        const data = {
            name,
            user: {
                connect: {
                    id: user === null || user === void 0 ? void 0 : user.id
                }
            }
        };
        const collection = yield (0, collection_service_1.createCollection)(data);
        res.status(201).json({ data: collection });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.postCollection = postCollection;
const getUserCollections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const collections = yield (0, collection_service_1.findAllUserCollections)(Number(user === null || user === void 0 ? void 0 : user.id));
        res.json({ data: collections });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserCollections = getUserCollections;
const getCollectionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId, collectionId: id } = req.params;
        const collection = yield (0, collection_service_1.findCollectionByIdAndUser)(Number(id), Number(userId));
        res.json({ data: collection });
    }
    catch (error) {
        next(error);
    }
});
exports.getCollectionById = getCollectionById;
exports.default = {
    postCollection: exports.postCollection,
    getUserCollections: exports.getUserCollections,
    getCollectionById: exports.getCollectionById
};
