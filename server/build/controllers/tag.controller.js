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
exports.getAllTags = exports.getTagsByText = exports.postTags = void 0;
const tags_service_1 = require("../services/tags.service");
const postTags = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = req.body.tags;
        if (tags.length > 25) {
            const error = new Error('You can add only 25 tags at once.');
            error.status = 413;
            return next(error);
        }
        const recipeTags = [];
        let _tags = yield Promise.all(tags.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ text }) {
            const tagInDatabase = yield (0, tags_service_1.findTagByText)(text);
            if (tagInDatabase) {
                recipeTags.push(tagInDatabase.id);
            }
            return tagInDatabase ? null : { text };
        })));
        _tags = _tags.filter((tag) => tag !== null);
        if (recipeTags.length != 0 && recipeTags.length == tags.length) {
            const tag = yield (0, tags_service_1.findTagsByTextAndReturnIds)(tags);
            const error = new Error('The tags already exist.');
            error.status = 409;
            error.data = { tags: tag };
            return next(error);
        }
        yield (0, tags_service_1.createTags)(_tags);
        if (recipeTags.length != 0 && recipeTags.length < tags.length) {
            const existingTags = recipeTags;
            const newTags = yield (0, tags_service_1.findTagsByTextAndReturnIds)(_tags);
            return res.status(201).json({ message: 'Tags created.', data: { newTags, existingTags, tags: [...newTags, ...recipeTags] } });
        }
        const tagIds = yield (0, tags_service_1.findTagsByTextAndReturnIds)(tags);
        return res.status(201).json({ message: 'Tags added.', data: { tags: tagIds } });
    }
    catch (error) {
        next(error);
    }
});
exports.postTags = postTags;
const getTagsByText = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.q;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const tag = yield (0, tags_service_1.searchTags)(search, limit, skip);
        res.json({ data: tag, count: tag === null || tag === void 0 ? void 0 : tag.length });
    }
    catch (error) {
        next(error);
    }
});
exports.getTagsByText = getTagsByText;
const getAllTags = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield (0, tags_service_1.findAllTags)();
        res.json({ data: recipes });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTags = getAllTags;
exports.default = {
    postTags: exports.postTags,
    getTagsByText: exports.getTagsByText,
    getAllTags: exports.getAllTags
};
