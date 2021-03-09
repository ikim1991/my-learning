import { NextFunction } from 'express';
import model from '../model';


const user = {
    registerUser: async (email: string, password: string, username: string) => {
        
        const user = await model.user.registerUser(email, password, username)

        return user
    },
    findUserByEmail: async (email: string) => {
        const user = await model.user.findUserByEmail(email)

        return user
    },
    getUserCredentials: async (email: string, next: NextFunction) => {
        const userPw = await model.user.getUserCredentials(email)

        return userPw
    }
}

export default user;