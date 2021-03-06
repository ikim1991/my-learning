
import ApiError from "../error/ApiError.js";
import { checkPokedexCache } from "../service/cache.js";

const cache = async (req, res, next) => {

    const { clientId } = req.session
    const pokedex = JSON.parse(await checkPokedexCache(clientId))

    if(pokedex instanceof ApiError){
        return next(pokedex)
    }

    if(!pokedex){
        next()
    } else{
        console.log('Grabbing from Cache...')
        return res.send(pokedex)
    }
}

export default cache;