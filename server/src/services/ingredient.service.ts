import db from "../utils/db"

export const findIngredients = async (take: number, skip: number) => {
    try {
        return await db.ingredient.findMany({
            take,
            skip
        });
    } catch(error) {
        throw error
    }
}

export const findIngredientsByName = async (name: string) => {
    try {
        return await db.ingredient.findMany({
            where: {
                name: {
                    startsWith: name
                }
            }, orderBy: {
                name: 'asc'
            }
        })
    } catch(error){
        throw error
    }
}

export const findIngredientByID = async (id: number) => {
    try {
        return await db.ingredient.findUnique({
            where: {
                id
            }
        })
    } catch(error){
        throw error
    }
}

export default {
    findIngredients,
    findIngredientsByName,
    findIngredientByID
}