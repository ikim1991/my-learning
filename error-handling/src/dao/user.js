import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError.js';

// Dummy Database
const users = {
    'onepiece@example.com': {
        pwHash: bcrypt.hashSync('luffy', 10),
        id: 0,
        username: 'Monkey D. Luffy',
        pokedex: [],
        fluff: 'fluff data'
    },
    'twopiece@example.com': {
        pwHash: bcrypt.hashSync('ace', 10),
        username: 'Portgas D. Ace',
        id: 1,
        pokedex: [],
        fluff: 'fluff data'
    }
}

export const findUserByEmail = async (email) => {

    const user = {...users[email]};
    delete user.fluff

    return user ? user : ApiError.notFound('User not Found...');
}

export const findPokedexByEmail = async (email) => {

    const user = {...users[email]}

    return user ? user.pokedex : ApiError.notFound('User not Found...');
}

export const appendPokemonByEmail = async (email, pokemon) => {

    const user = users[email]

    if(user){
        user.pokedex.push(pokemon)
    }

    return user ? user.pokedex : ApiError(notFound('User not Found...'))
}