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
exports.findAverageRatings = exports.fetchUserRecipes = exports.addRecipeImages = exports.updateRecipeAllergens = exports.updateRecipeTags = exports.updateRecipeIngredients = exports.updateRecipe = exports.updateRecipeSteps = exports.findRecipesbyCourse = exports.findRecipeIngredients = exports.deleteRecipe = exports.findRecipes = exports.findRecipesbyDiet = exports.findRecipesbyCuisine = exports.findRecipeById = exports.createRecipe = void 0;
const db_1 = __importDefault(require("../utils/db"));
const createRecipe = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.recipe.create({
            data
        });
    }
    catch (error) {
        throw error;
    }
});
exports.createRecipe = createRecipe;
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
                    id: true,
                    name: true
                }
            },
            unit: {
                select: {
                    name: true,
                    id: true
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
    allergen: true,
    images: true,
};
const findRecipeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.recipe.findUnique({
            where: {
                id,
            },
            select
        });
    }
    catch (error) {
        throw error;
    }
});
exports.findRecipeById = findRecipeById;
const findRecipesbyCuisine = (cuisineId, take, skip) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield db_1.default.recipe.count({ where: { cuisineId } });
        return yield db_1.default.recipe.findMany({
            where: {
                cuisineId
            },
            select,
            take: take,
            skip: skip
        }).then(result => ({ result, count }));
    }
    catch (error) {
        throw error;
    }
});
exports.findRecipesbyCuisine = findRecipesbyCuisine;
const findRecipesbyDiet = (dietId, take, skip) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield db_1.default.recipe.count({ where: { dietId } });
        return yield db_1.default.recipe.findMany({
            where: {
                dietId
            },
            select,
            take: take,
            skip: skip
        }).then(result => ({ result, count }));
    }
    catch (error) {
        throw error;
    }
});
exports.findRecipesbyDiet = findRecipesbyDiet;
const findRecipes = (take, skip, where) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield db_1.default.recipe.count({ where });
        return yield db_1.default.recipe.findMany({
            where,
            select,
            take: take,
            skip: skip,
        }).then(result => ({ result, count }));
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.findRecipes = findRecipes;
const deleteRecipe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.recipe.delete({
            where: {
                id
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteRecipe = deleteRecipe;
const findRecipeIngredients = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.recipe.findUnique({
        where: {
            id
        },
        select: {
            ingredients: {
                include: {
                    ingredient: true,
                    unit: true
                }
            },
        }
    });
});
exports.findRecipeIngredients = findRecipeIngredients;
const findRecipesbyCourse = (course, take, skip) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield db_1.default.recipe.count({ where: { course } });
        return yield db_1.default.recipe.findMany({
            where: {
                course
            },
            select,
            take: take,
            skip: skip
        }).then(result => ({ result, count }));
    }
    catch (error) {
        throw error;
    }
});
exports.findRecipesbyCourse = findRecipesbyCourse;
const updateRecipeSteps = (steps, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.recipeStep.deleteMany({
            where: {
                recipe: {
                    id
                }
            }
        });
        yield db_1.default.recipe.update({
            where: {
                id
            },
            data: {
                steps: {
                    createMany: {
                        data: steps
                    }
                }
            }
        });
    }
    catch (error) {
        throw (error);
    }
});
exports.updateRecipeSteps = updateRecipeSteps;
const updateRecipe = (title, description, course, cuisine, diet, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.recipe.update({
            where: {
                id
            },
            data: {
                title,
                description,
                course,
                cuisineId: cuisine,
                dietId: diet
            }
        });
    }
    catch (error) {
        throw (error);
    }
});
exports.updateRecipe = updateRecipe;
const updateRecipeIngredients = (ingredients, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.recipeIngredient.deleteMany({
            where: {
                recipe: {
                    id
                }
            }
        });
        yield db_1.default.recipe.update({
            where: {
                id
            },
            data: {
                ingredients
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateRecipeIngredients = updateRecipeIngredients;
const updateRecipeTags = (tags, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.recipeTag.deleteMany({
            where: {
                recipe: {
                    id
                }
            }
        });
        yield db_1.default.recipe.update({
            where: {
                id
            },
            data: {
                tags: {
                    create: tags.map((id) => ({ tag: { connect: { id: Number(id) } } }))
                }
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateRecipeTags = updateRecipeTags;
const updateRecipeAllergens = (allergen, recipeId, prevAllergen) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.recipe.update({
            where: {
                id: recipeId
            },
            data: {
                allergen: {
                    disconnect: prevAllergen.map(({ id }) => ({ id }))
                }
            }
        });
        yield db_1.default.recipe.update({
            where: {
                id: recipeId
            },
            data: {
                allergen: {
                    connect: allergen.map((id) => ({ id }))
                }
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateRecipeAllergens = updateRecipeAllergens;
const addRecipeImages = (images, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.recipe.update({
            where: {
                id
            },
            data: {
                images: {
                    create: images.map((url) => ({ url }))
                }
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addRecipeImages = addRecipeImages;
const fetchUserRecipes = (id, take, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.default.recipe.count({
        where: {
            chef: {
                id
            }
        }
    });
    return yield db_1.default.recipe.findMany({
        where: {
            chef: {
                id
            }
        },
        select,
        orderBy: {
            createdAt: 'desc',
        },
        take,
        skip
    }).then(result => ({ result, count }));
});
exports.fetchUserRecipes = fetchUserRecipes;
const findAverageRatings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.review.aggregate({
        _avg: {
            rating: true
        },
        _count: true,
        where: {
            recipe: {
                id
            }
        }
    });
});
exports.findAverageRatings = findAverageRatings;
exports.default = {
    createRecipe: exports.createRecipe,
    findRecipeById: exports.findRecipeById,
    findRecipesbyCuisine: exports.findRecipesbyCuisine,
    findRecipesbyDiet: exports.findRecipesbyDiet,
    findRecipes: exports.findRecipes,
    deleteRecipe: exports.deleteRecipe,
    findRecipeIngredients: exports.findRecipeIngredients,
    findRecipesbyCourse: exports.findRecipesbyCourse,
    updateRecipeSteps: exports.updateRecipeSteps,
    updateRecipe: exports.updateRecipe,
    updateRecipeIngredients: exports.updateRecipeIngredients,
    updateRecipeTags: exports.updateRecipeTags,
    fetchUserRecipes: exports.fetchUserRecipes
};
