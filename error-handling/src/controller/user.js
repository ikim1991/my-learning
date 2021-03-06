import { appendPokemonByEmail } from "../dao/user.js"
import ApiError from "../error/ApiError.js"
import { setPokedexCache } from "../service/cache.js"
import { checkCredentials, fetchPokemon, viewPokedex } from "../service/user.js"

export const getHome = async (req, res, next) => {
    return res.send('HOME')
}

export const userLogin = async (req, res, next) => {

    const { email, password } = req.body

        if(!email || !password){
            next(ApiError.badRequest('Email and Password required...'))
        }
    
    try{
        
        const user = await checkCredentials(email, password)
        
        if(user instanceof ApiError){
            return next(user)
        }

        req.session.email = email
        req.session.clientId = user.id
        
        return res.send()

    } catch(err){
        next(ApiError.internal('Something went wrong...'))
    }
}

export const getPokemons = async (req, res, next) => {
    try{
        const { clientId, email } = req.session

        const pokedex = await viewPokedex(clientId, email)

        if(pokedex instanceof ApiError){
            return next(pokedex)
        }

        res.send(pokedex)
    } catch(err){
        next(ApiError.internal('Something went wrong...'))
    }
}

export const setPokemon = async (req, res, next) => {

    const { name } = req.body
    const { clientId, email } = req.session

    try{
        const pokemon = await fetchPokemon(name)

        if(pokemon instanceof ApiError){
            return next(pokemon)
        }

        console.log('Storing in DB...')
        const pokedex = await appendPokemonByEmail(email, pokemon)

        if(pokedex instanceof ApiError){
            return next(pokedex)
        }

        console.log('Caching query...')
        await setPokedexCache(clientId, email, pokedex)

        return res.sendStatus(204)

    } catch(err){
        next(ApiError.internal('Something went wrong...'))
    }

}