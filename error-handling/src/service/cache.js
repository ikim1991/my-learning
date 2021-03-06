import { GET_ASYNC, SET_ASYNC } from "../dao/cache.js"
import ApiError from "../error/ApiError.js"

export const checkPokedexCache = async (id) => {

    try{

        const pokedex = await GET_ASYNC(id)
        
        return pokedex
        
    } catch(err){
        return ApiError.internal('Something went wrong...')
    }

}

export const setPokedexCache = async (id, email, pokedex) => {

    try{
        console.log(`Caching Pokedex for ${id} - ${email}`, pokedex)
        await SET_ASYNC(id, JSON.stringify(pokedex), 'EX', 60)

        return true

    }catch(err){
        return ApiError.internal('Something went wrong...')
    }
}

export const getSessionCache = async (sessionId) => {

    try{
        const id = `sess:${sessionId}`

        const session = await GET_ASYNC(id)

        console.log("Getting Session Cache for Auth...")
        return session

    } catch(err){
        return ApiError.internal('Something went wrong...')
    }

}