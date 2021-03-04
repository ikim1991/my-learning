import { findUserByEmail } from '../dao/user.js'
import bcrypt from 'bcrypt';

export const userLogin = async (email, password) => {
    
    try{
        const user = await findUserByEmail(email);
        const match = await bcrypt.compare(password, user.pwHash)

        if(match){
            return {
                id: user.id,
                roles: user.roles
            }
        } else{
            return Promise.reject('Wrong Username or Password...')
        }
        
    } catch(err){
        return Promise.reject('User Not Found...')
    }    
}