import { NextFunction, Response } from 'express';
import Request from '../interfaces/Request.interface';
import { findAllUnits, findUnitById, findUnitByName } from '../services/unit.service';
import { HTTPError } from '../interfaces/HTTPError';

export const getAllUnits = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const units = await findAllUnits();
        res.json({ data: units });
    } catch(error){
        next(error);
    }
};

export const getUnitById = async (req: Request, res: Response, next: NextFunction) => {
    try  {
        const id = Number(req.params.id);
        const unit = await findUnitById(id);
        if(!unit){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: unit });
    } catch(error){
        next(error);
    }
};

export const getUnitByName = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const search = req.query.q ?? '';
        const units = await findUnitByName(<string>search);
        if(units.length == 0){
            const error: HTTPError = new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        res.json({ data: units });
    } catch(error){
        next(error);
    }
};

export default {
    getAllUnits,
    getUnitById,
    getUnitByName
};