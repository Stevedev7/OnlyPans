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
exports.getReview = exports.deleteReview = exports.postReview = void 0;
const recipe_service_1 = require("../services/recipe.service");
const review_service_1 = require("../services/review.service");
const postReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0;
        const recipeExists = yield (0, recipe_service_1.findRecipeById)(Number(id));
        if (!recipeExists) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const reviewedByUser = yield (0, review_service_1.findReviewByUserAndRecipe)(recipeExists.id, userId);
        if (reviewedByUser !== null) {
            const error = new Error('Already rated');
            error.status = 409;
            error.data = reviewedByUser;
            return next(error);
        }
        const { review, rating } = req.body;
        if (rating == 0) {
            const error = new Error('Please provide a rating.');
            error.status = 400;
            return next(error);
        }
        yield (0, review_service_1.createReview)({ rating, review }, recipeExists.id, userId);
        res.status(201).json({ message: 'Review added' });
    }
    catch (error) {
        next(error);
    }
});
exports.postReview = postReview;
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id, reviewId } = req.params;
        const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0;
        const recipeExists = yield (0, recipe_service_1.findRecipeById)(Number(id));
        if (!recipeExists) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const reviewExists = yield (0, review_service_1.findReviewById)(Number(reviewId));
        if (!reviewExists) {
            const error = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        const reviewedByUser = yield (0, review_service_1.findReviewByUserAndRecipe)(recipeExists.id, userId);
        if (!reviewedByUser) {
            const error = new Error('Unauthorized');
            error.status = 401;
            return next(error);
        }
        if (reviewedByUser.id !== Number(reviewId)) {
            const error = new Error('Bad Request');
            error.status = 400;
            error.data = { reviewedByUser, reviewId };
            return next(error);
        }
        yield (0, review_service_1.deleteReviewById)(Number(reviewId));
        res.status(200).json({ message: 'Review deleted', data: reviewedByUser });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteReview = deleteReview;
const getReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const { id } = req.params;
        const recipe = (0, recipe_service_1.findRecipeById)(Number(id));
        if (!recipe) {
            const error = new Error('Not Found');
            error.status = 404;
            throw error;
        }
        const reviews = yield (0, review_service_1.findReviewsByRecipeId)(Number(id), limit, skip);
        res.status(200).json({ data: reviews.result, count: reviews.count });
    }
    catch (error) {
        next(error);
    }
});
exports.getReview = getReview;
exports.default = {
    postReview: exports.postReview,
    deleteReview: exports.deleteReview,
    getReview: exports.getReview
};
