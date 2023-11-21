import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import Tag from '../interfaces/Tags.interface';
import { createTags, findTagByText, searchTags, findTagsByTextAndReturnIds, findAllTags } from '../services/tags.service';
import { HTTPError } from '../interfaces/HTTPError';

export const postTags = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const tags: Omit<Tag, 'id'>[] = req.body.tags;
        if(tags.length > 25){
            const error: HTTPError = new Error('You can add only 25 tags at once.');
            error.status = 413;
            return next(error);
        }
        const recipeTags: number[] = [];
        let _tags = await Promise.all(tags.map(async ({ text }) => {
            const tagInDatabase = await findTagByText(text);
            if(tagInDatabase){
                recipeTags.push(tagInDatabase.id);
            }
            return tagInDatabase ? null : { text };
        }));
        _tags = _tags.filter((tag) => tag !== null);
        if(recipeTags.length != 0 && recipeTags.length == tags.length){ 
            const tag = await findTagsByTextAndReturnIds(tags);
            const error: HTTPError = new Error('The tags already exist.');
            error.status = 409;
            error.data = { tags: tag };
            return next(error);
        }
        await createTags(_tags as Omit<Tag, 'id'>[]);

        if(recipeTags.length != 0 && recipeTags.length < tags.length){
            const existingTags = recipeTags;
            const newTags = await findTagsByTextAndReturnIds(_tags as Omit<Tag, 'id'>[]);
            return res.status(201).json({ message: 'Tags created.', data: { newTags, existingTags, tags: [ ...newTags, ...recipeTags] }});
        }
        const tagIds = await findTagsByTextAndReturnIds(tags);
        return res.status(201).json({ message: 'Tags added.', data: { tags: tagIds }});
    } catch(error){
        next(error);
    }
};

export const getTagsByText = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const search = req.query.q;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 25;
        const skip = ((page - 1) * limit);
        const tag = await searchTags(search as string, limit, skip);
        res.json({ data: tag, count: tag?.length });
    } catch(error){
        next(error);
    }
};

export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const recipes = await findAllTags();
        res.json( { data: recipes});
    } catch(error){
        next(error);
    }
};
export default {
    postTags,
    getTagsByText,
    getAllTags
};