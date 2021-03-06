import axios from "axios"
import ApiError from "../error/ApiError.js"

export const getPokemon = async (name) => {
    
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const pokemon = response.data
        
        if(!pokemon){
           return ApiError.notFound('Pokemon Not Found...')
        }
    
        return {
            id: pokemon.id,
            name: pokemon.name,
            abilities: pokemon.abilities,
            stat: pokemon.stat
        }

    } catch(err){
        return ApiError.internal('Pokedex Unavailable...')
    }
    
}