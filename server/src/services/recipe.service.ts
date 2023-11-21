/* eslint-disable no-useless-catch */
import { Course } from '@prisma/client';
import db from '../utils/db';
import diets from '../data/diet';

export const createRecipe = async (data: any) => {
    try{
        return await db.recipe.create({
            data
        });
    } catch(error){
        throw error;
    }
};

const select: any = {
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

export const findRecipeById = async (id: number) => {
    try{
        return await db.recipe.findUnique({
            where: {
                id,
            },
            select
        });
    } catch(error){
        throw error;
    }
};

export const findRecipesbyCuisine = async (cuisineId: number, take: number, skip: number) => {
    try{
        const count = await db.recipe.count({ where: { cuisineId } });
        return await db.recipe.findMany({
            where: {
                cuisineId
            },
            select,
            take: take,
            skip: skip
        }).then(result =>( { result, count }));
    } catch(error){
        throw error;
    }
};

export const findRecipesbyDiet = async (dietId: number, take: number, skip: number)=> {
    try{
        const count = await db.recipe.count({ where: { dietId } });
        return await db.recipe.findMany({
            where: {
                dietId
            },
            select,
            take: take,
            skip: skip
        }).then(result => ({ result, count }));
    } catch(error){
        throw error;
    }
};

export const findRecipes = async(take: number, skip: number, where: any) => {
    try{
        const count = await db.recipe.count({ where });
        return await db.recipe.findMany({
            where,
            select,
            take: take,
            skip: skip,
        }).then(result => ({ result, count }));

    } catch(error){
        console.log(error);
        throw error;
    }
};

export const deleteRecipe = async(id: number) => {
    try{
        return await db.recipe.delete({
            where: {
                id
            }
        });
    } catch(error){
        throw error;
    }
};

export const findRecipeIngredients = async(id: number) => {
    return await db.recipe.findUnique({
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
};


export const findRecipesbyCourse = async (course: Course, take: number, skip: number)=> {
    try{
        const count = await db.recipe.count({ where: { course } });
        return await db.recipe.findMany({
            where: {
                course
            },
            select,
            take: take,
            skip: skip
        }).then(result => ({ result, count }));
    } catch(error){
        throw error;
    }
};

export const updateRecipeSteps = async (steps: any, id: number) => {
    try {
        await db.recipeStep.deleteMany({
            where: {
                recipe: {
                    id
                }
            }
        });

        await db.recipe.update({
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
    } catch(error){
        throw(error);
    }
};

export const updateRecipe = async (title: string, description: string, course:Course, cuisine: number, diet: number, id: number) => {
    try {

        await db.recipe.update({
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
    } catch(error){
        throw(error);
    }
};

export const updateRecipeIngredients = async (ingredients: any, id: number) => {
    try{
        await db.recipeIngredient.deleteMany({
            where: {
                recipe: {
                    id
                }
            }
        });
        await db.recipe.update({
            where: {
                id
            },
            data: {
                ingredients
            }
        });
    } catch(error){
        throw error;
    }
};

export const updateRecipeTags = async (tags: number[], id: number) => {
    try{
        await db.recipeTag.deleteMany({
            where: {
                recipe: {
                    id
                }
            }
        });

        await db.recipe.update({
            where: {
                id
            },
            data: {
                tags: {
                    create: tags.map((id: number) => ({ tag: { connect: { id: Number(id) } } }))
                }
            }
        });
    } catch(error){
        throw error;
    }
};

export const updateRecipeAllergens = async (allergen: number[], recipeId: number, prevAllergen: any[]) => {
    try {
        await db.recipe.update({
            where: {
                id: recipeId
            },
            data: {
                allergen: {
                    disconnect: prevAllergen.map(({ id }) => ({ id }))
                }
            }
        });

        await db.recipe.update({
            where: {
                id: recipeId
            },
            data: {
                allergen: {
                    connect: allergen.map((id) => ({ id }))
                }
            }
        });
    } catch(error) {
        throw error;
    }
};

export const addRecipeImages = async (images: string[], id: number) => {
    try {
        await db.recipe.update({
            where: {
                id
            },
            data: {
                images:{
                    create: images.map((url: string) => ({ url }))
                }
            }
        });
    } catch(error){
        throw error;
    }
};

export const fetchUserRecipes = async (id: number, take: number, skip: number) => {
    const count = await db.recipe.count({
        where: {
            chef: {
                id
            }
        }
    });
    return await db.recipe.findMany({
        where: {
            chef:{
                id
            }
        },
        select,
        orderBy: {
            createdAt : 'desc',
        },
        take,
        skip
    }).then(result => ({ result, count }));
};

export const findAverageRatings = async (id: number) => {
    return await db.review.aggregate({
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
};

export default {
    createRecipe,
    findRecipeById,
    findRecipesbyCuisine,
    findRecipesbyDiet,
    findRecipes,
    deleteRecipe,
    findRecipeIngredients,
    findRecipesbyCourse,
    updateRecipeSteps,
    updateRecipe,
    updateRecipeIngredients,
    updateRecipeTags,
    fetchUserRecipes
};