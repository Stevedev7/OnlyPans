import db from "../utils/db"

export const findAllUnits = async () => {
    try{
        return await db.unit.findMany();
    } catch(error){
        throw error
    }
}

export const findUnitById = async (id: number) => {
    try{
        return await db.unit.findUnique({
            where: {
                id
            }   
        })
    } catch(error){
        throw error
    }
}

export const findUnitByName = async (name: string) => {
    try {
        return await db.unit.findMany({
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
    findAllUnits,
    findUnitById,
    findUnitByName
}