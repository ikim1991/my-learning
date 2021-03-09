import { hash } from 'bcryptjs';
import mongoose, { Schema, Document, Model } from 'mongoose';
import ApiError from '../error/ApiError';

interface UserI extends Document{
    username: string,
    email: string,
    password: string,
}

interface UserIDoc extends UserI, Document{
    getUserCredentials(): string | ApiError;
}

interface UserIModel extends Model<UserIDoc>{
    registerUser(email: string, password: string, username: string): UserI | ApiError | null;
    findUserByEmail(email: string): UserI | ApiError | null;
    getUserCredentials(email: string): string | ApiError;
}

const UserSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.static('registerUser', async (email: string, password: string, username: string) => {

    try{
        const allowed = await User.findOne({email})

        if(allowed){
            return ApiError.badRequest('Email already in use...')
        }

        const user = await User.create({ email, password, username})

        return user
    } catch(err){
        return ApiError.badRequest('Error in Registering...')
    }
})

UserSchema.static('findUserByEmail', async (email) => {
    try{
        const user = await User.findOne({ email }).select('-password -__v')

        if(!user){
            return ApiError.notFound("User was Not Found...")
        }

        return user
    } catch(err){
        return ApiError.notFound('User Not Found...')
    }
})

UserSchema.static('getUserCredentials', async function(email) {
    try{

        const user = await User.findOne({email})

        if(!user){
            return ApiError.badRequest('Login failed...')
        }

        return user.password

    } catch(err){
        return ApiError.internal('Something went Wrong...')
    }
})

UserSchema.pre<UserI>('save', async function(){
    if(this.isModified('password')){
        this.password = await hash(this.password!, 12)
    }
})

const User = mongoose.model<UserIDoc, UserIModel>("User", UserSchema)
export default User;