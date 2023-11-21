import db from '../utils/db';
import Tags from '../interfaces/Tags.interface';
export const createTags = async (tags: Omit<Tags, 'id'>[]) => {
    try{
        return await db.tag.createMany({
            data: tags,
            skipDuplicates: true
        });
    } catch(error) {
        throw error;
    }
};

export const searchTags = async(text: string, take: number, skip: number) => {
    try {
        return await db.tag.findMany({
            where: {
                text: {
                    startsWith: text
                }
            },
            take,
            skip
        });
    } catch (error) {
        throw error;
    }
};

export const findTagByText = async (text: string) => {
    try{
        return await db.tag.findFirst({
            where: {
                text: {
                    startsWith: text
                }
            },
            orderBy: {
                text: 'asc'
            }
        });
    } catch(error){
        throw error;
    }
};

export const findTagsByTextAndReturnIds = async (tags: Omit<Tags, 'id'>[]) => {
    try{
        const tagIds = [];

        for(const { text } of tags){
            const tag = (await db.tag.findFirst({
                select:{
                    id: true
                },
                where: {
                    text
                }
            }))?.id;

            tagIds.push(tag);
        }
        return tagIds;
    } catch(error){
        throw error;
    }
};

export const findAllTags = async () => {
    try{
        return await db.tag.findMany();
    } catch(error){
        throw error;
    }
};

export default {
    createTags,
    findTagByText,
    searchTags,
    findAllTags
};