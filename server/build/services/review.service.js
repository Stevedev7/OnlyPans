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
exports.findReviewsByRecipeId = exports.findReviewById = exports.deleteReviewById = exports.findReviewByUserAndRecipe = exports.createReview = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createReview = (data, recipeId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.review.create({
        data: Object.assign(Object.assign({}, data), { recipe: {
                connect: {
                    id: recipeId
                }
            }, user: {
                connect: {
                    id: userId
                }
            } })
    });
});
exports.createReview = createReview;
const findReviewByUserAndRecipe = (recipe, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.review.findFirst({
        where: {
            recipe: {
                id: recipe
            },
            user: {
                id: user
            }
        }
    });
});
exports.findReviewByUserAndRecipe = findReviewByUserAndRecipe;
const deleteReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.review.delete({
        where: {
            id
        }
    });
});
exports.deleteReviewById = deleteReviewById;
const findReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.review.findUnique({
        where: {
            id
        }
    });
});
exports.findReviewById = findReviewById;
const findReviewsByRecipeId = (id, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.default.review.count({
        where: {
            recipe: {
                id
            }
        }
    });
    return db_1.default.review.findMany({
        where: {
            recipe: {
                id
            }
        },
        include: {
            user: {
                select: {
                    emailId: true,
                    firstName: true,
                    lastName: true
                }
            }
        },
        orderBy: [
            { createdAt: 'desc' }
        ],
        skip,
        take: limit
    }).then(result => ({ result, count }));
});
exports.findReviewsByRecipeId = findReviewsByRecipeId;
exports.default = {
    createReview: exports.createReview,
    findReviewByUserAndRecipe: exports.findReviewByUserAndRecipe,
    findReviewById: exports.findReviewById
};
