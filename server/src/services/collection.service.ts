import db from '../utils/db';

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

export const findCollectionByNameAndUser = async (name: string, id: any) => {

    return await db.collection.findFirst({
        where: {
            name,
            user: {
                id
            }
        }
    });
};

export const findAllUserCollections = async (id: number) => {
    return await db.collection.findMany({
        where: {
            user: {
                id
            }
        }
    });
};

export const createCollection = async (data: any) => {
    return await db.collection.create({
        data
    });
};

export const findCollectionByIdAndUser = async (id: number, userId: number) => {
    return await db.collection.findFirst({
        where:{
            user: {
                id: userId
            }
        }
    });
};

export const findFavorites = async(id: number) => {
    return await db.collection.findFirst({
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
};

export const getFavoriteRecipes = async (id: number, take: number, skip: number) => {
    const count = await db.recipe.count({
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
    return await db.recipe.findMany({
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
};

export const recipeInFavorites = async (id: number, recipeId: number) => {
    return await db.recipe.findFirst({
        where:{
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
};

export const addToCollection = async(id: number, recipeId: number) => {
    return await db.collection.update({
        where: {
            id,
        },
        data: {
            recipes: {
                connect: [ { id: recipeId }]
            }
        }
    });
};

export const removeFromCollection = async(id: number, recipeId: number) => {
    return await db.collection.update({
        where: {
            id,
        },
        data: {
            recipes: {
                disconnect: [ { id: recipeId }]
            }
        }
    });
};

export default {
    findCollectionByNameAndUser,
    findAllUserCollections,
    findCollectionByIdAndUser,
    findFavorites,
    recipeInFavorites,
    removeFromCollection,
    getFavoriteRecipes
};