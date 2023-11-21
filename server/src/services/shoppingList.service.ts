import db from '../utils/db';

export const findShoppingList = async (id: number) => {
    return await db.shoppingList.findFirst({
        where: {
            user: {
                id
            }
        },
        select: {
            id: true,
            ingredients: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    });
};

export const createShoppingList = async (id: number) => {
    return await db.shoppingList.create({
        data: {
            user: {
                connect: {
                    id
                }
            }
        }
    });
};

export const addIngredientToShoppingList = async (id: number, ingredient: number) => {
    return await db.shoppingList.update({
        where: {
            id
        },
        data: {
            ingredients: {
                connect: {
                    id: ingredient
                }
            }
        }
    });
};

export const checkIngredientInShoppingList = async (id: number, ingredient: number) => {
    return await db.shoppingList.findFirst({
        where: {
            id,
            ingredients: {
                some: {
                    id: ingredient
                }
            }
        }
    });
};

export const removeIngerdientFromShoppingList = async (id: number, ingredient: number) => {

    return await db.shoppingList.update({
        where: {
            id
        },
        data: {
            ingredients: {
                disconnect: {
                    id: ingredient
                }
            }
        }
    });
};
export default {
    findShoppingList,
    createShoppingList,
    addIngredientToShoppingList,
    checkIngredientInShoppingList,
    removeIngerdientFromShoppingList
};