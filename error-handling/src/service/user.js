import { findPokedexByEmail, findUserByEmail } from "../dao/user.js"
import bcrypt from 'bcrypt'
import ApiError from "../error/ApiError.js"
import { getPokemon } from "../apis/PokemonAPIHandler.js"
import { setPokedexCache } from "./cache.js"

export const checkCredentials = async (email, password) => {
    try{

        const user = await findUserByEmail(email)
        const match = await bcrypt.compare(password, user.pwHash)

        if(match){
            return user
        }

        return ApiError.forbidden('Email / Password Not a Match...')
        
    } catch(err){
        return ApiError.internal('Error in Fetching Data...')
    }
}

export const fetchPokemon = async (name) => {
    try{
        const pokemon = await getPokemon(name)

        return pokemon

    } catch(err){
        return ApiError.internal('Error in Fetching Data...')
    }
}

export const viewPokedex = async (id, email) => {

    try{

        const pokedex = await findPokedexByEmail(email)

        if(pokedex instanceof ApiError){
            return pokedex
        }

        console.log('Grabbing from DB...')
        return pokedex

    } catch(err){
        return ApiError.internal('Error in Fetching Data...')
    }
}