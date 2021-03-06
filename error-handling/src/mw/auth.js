
import ApiError from "../error/ApiError.js";
import { getSessionCache } from "../service/cache.js";

const authenticate = async (req, res, next) => {

    const { clientId, email, id } = req.session
    
    if(!email){
        return next(ApiError.unauthorized('Unauthorized Action...'))
    }

    const session = JSON.parse(await getSessionCache(id))

    if(!session){
        if(session.clientId != clientId && session.email != email){
            return next(ApiError.unauthorized('Unauthorized Action...'))
        }
    }

    next()
}

export default authenticate;