import db from "../utils/db"

export const findAllCuisines = async () => {
    try{
        return await db.cuisine.findMany();
    } catch(error){
        throw error
    }
}

export const findCuisineById = async (id: number) => {
    try{
        return await db.cuisine.findUnique({
            where: {
                id
            }   
        })
    } catch(error){
        throw error
    }
}

export const findCuisineByName = async (name: string) => {
    try {
        return await db.cuisine.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        })
    } catch(error){
        throw error
    }
}

export default {
    findAllCuisines,
    findCuisineById,
    findCuisineByName
}