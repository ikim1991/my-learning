import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";
import service from "../service";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const { userId, id } = req.session

        if(!userId){
            return next(ApiError.unauthorized('Unauthorized Request...'))
        }

        const session = await service.cache.checkSessionCache(id)

        if(!session){
            return next(ApiError.unauthorized('Unauthorized Request...'))
        }

        if(session.userId === userId){
            return next()
        }

        next(ApiError.internal('Unauthorized Request...'))
        
    } catch(err){
        return next(ApiError.internal('Something went wrong...'))
    }
}

export default authenticate;