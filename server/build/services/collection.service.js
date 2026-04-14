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
exports.removeFromCollection = exports.addToCollection = exports.recipeInFavorites = exports.getFavoriteRecipes = exports.findFavorites = exports.findCollectionByIdAndUser = exports.createCollection = exports.findAllUserCollections = exports.findCollectionByNameAndUser = void 0;
const db_1 = __importDefault(require("../utils/db"));
const select = {
    id: true,
    title: true,
    description: true,
    course: true,
    createdAt: true,
    ingredients: {
        select: {
            ingredient: {
                select: {
                    name: true
                }
            },
            unit: {
                select: {
                    name: true
                }
            },
            quantity: true
        }
    },
    steps: {
        select: {
            step: true
        },
        orderBy: {
            stepNumber: 'asc'
        }
    },
    chef: {
        select: {
            id: true,
            emailId: true,
            firstName: true,
            lastName: true
        }
    },
    tags: {
        select: {
            tag: true
        }
    },
    diet: {
        select: {
            id: true,
            name: true
        }
    },
    cuisine: true,
    allergen: {
        select: {
            name: true
        }
    },
    images: true,
};
const findCollectionByNameAndUser = (name, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.collection.findFirst({
        where: {
            name,
            user: {
                id
            }
        }
    });
});
exports.findCollectionByNameAndUser = findCollectionByNameAndUser;
const findAllUserCollections = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.collection.findMany({
        where: {
            user: {
                id
            }
        }
    });
});
exports.findAllUserCollections = findAllUserCollections;
const createCollection = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.collection.create({
        data
    });
});
exports.createCollection = createCollection;
const findCollectionByIdAndUser = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.collection.findFirst({
        where: {
            user: {
                id: userId
            }
        }
    });
});
exports.findCollectionByIdAndUser = findCollectionByIdAndUser;
const findFavorites = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.collection.findFirst({
        where: {
            name: 'favorites',
            user: {
                id
            }
        },
        include: {
            recipes: {
                select
            }
        }
    });
});
exports.findFavorites = findFavorites;
const getFavoriteRecipes = (id, take, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.default.recipe.count({
        where: {
            collection: {
                some: {
                    name: 'favorites',
                    user: {
                        id
                    }
                }
            }
        }
    });
    return yield db_1.default.recipe.findMany({
        where: {
            collection: {
                some: {
                    name: 'favorites',
                    user: {
                        id
                    }
                }
            }
        },
        select,
        skip,
        take
    }).then(result => ({ result, count }));
});
exports.getFavoriteRecipes = getFavoriteRecipes;
const recipeInFavorites = (id, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.recipe.findFirst({
        where: {
            collection: {
                some: {
                    name: 'favorites',
                    user: {
                        id
                    }
                }
            },
            id: recipeId
        }
    });
});
exports.recipeInFavorites = recipeInFavorites;
const addToCollection = (id, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.collection.update({
        where: {
            id,
        },
        data: {
            recipes: {
                connect: [{ id: recipeId }]
            }
        }
    });
});
exports.addToCollection = addToCollection;
const removeFromCollection = (id, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.collection.update({
        where: {
            id,
        },
        data: {
            recipes: {
                disconnect: [{ id: recipeId }]
            }
        }
    });
});
exports.removeFromCollection = removeFromCollection;
exports.default = {
    findCollectionByNameAndUser: exports.findCollectionByNameAndUser,
    findAllUserCollections: exports.findAllUserCollections,
    findCollectionByIdAndUser: exports.findCollectionByIdAndUser,
    findFavorites: exports.findFavorites,
    recipeInFavorites: exports.recipeInFavorites,
    removeFromCollection: exports.removeFromCollection,
    getFavoriteRecipes: exports.getFavoriteRecipes
};
