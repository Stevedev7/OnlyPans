import db from "../utils/db"

export const findAllDiets = async () => {
    try{
        return await db.diet.findMany();
    } catch(error){
        throw error
    }
}

export const findDietById = async (id: number) => {
    try{
        return await db.diet.findUnique({
            where: {
                id
            }   
        })
    } catch(error){
        throw error
    }
}

export const findDietByName = async (name: string) => {
    try {
        return await db.diet.findMany({
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
    findAllDiets,
    findDietById,
    findDietByName
}