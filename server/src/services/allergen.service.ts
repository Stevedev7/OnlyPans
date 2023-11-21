import db from "../utils/db"

export const findAllAllergens = async () => {
    try{
        return await db.allergen.findMany()
    } catch(error){
        throw error
    }
}

export const findAllergenById = async (id: number) => {
    try{
        return await db.allergen.findUnique({
            where: {
                id
            }   
        })
    } catch(error){
        throw error
    }
}

export const findAllergenByName = async (name: string) => {
    try {
        return await db.allergen.findMany({
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
    findAllAllergens,
    findAllergenById,
    findAllergenByName
}