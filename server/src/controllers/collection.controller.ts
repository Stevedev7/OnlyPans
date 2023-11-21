import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { HTTPError } from '../interfaces/HTTPError';
import { createCollection, findAllUserCollections, findCollectionByIdAndUser, findCollectionByNameAndUser } from '../services/collection.service';

export const postCollection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        const { name } = req.body;
        const collectionExists = await findCollectionByNameAndUser(name, user?.id);

        if(collectionExists){
            const error: HTTPError = new Error('Collection exists');
            error.status = 409;
            return next(error);
        }
        const data = {
            name,
            user: {
                connect: {
                    id: user?.id
                }
            }
        };
        const collection = await createCollection(data);
        res.status(201).json({ data: collection });
    } catch(error) {
        console.log(error);
        next(error);
    }
};

export const getUserCollections = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.user;
        const collections = await findAllUserCollections(Number(user?.id));
        res.json({ data: collections });
    } catch(error){
        next(error);
    }
};

export const getCollectionById = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { id:userId, collectionId: id } = req.params;
        const collection = await findCollectionByIdAndUser(Number(id), Number(userId));
        res.json({ data:collection });
    } catch(error){
        next(error);
    }
};

export default {
    postCollection,
    getUserCollections,
    getCollectionById
};