import { compare } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError';
import service from '../service';

const user = {

   getHome: (req: Request, res: Response) => {
      res.sendStatus(200)
   },
   postRegister: async (req: Request, res: Response, next: NextFunction) => {

      const { email, password, confirm, username } = req.body

      if(!email || !password){
         return next(ApiError.badRequest('Provide an email and password'))
      }

      if(password != confirm){
         return next(ApiError.badRequest('Password must match'))
      }
   
      const user = await service.user.registerUser(email, password, username)

      if(user instanceof ApiError){
         return next(user)
      }

      res.sendStatus(201)
   },
   postLogin: async (req: Request, res: Response, next: NextFunction) => {

      const { email, password } = req.body
      
      const userPw = await service.user.getUserCredentials(email, next)

      if(userPw instanceof ApiError){
         return next(userPw)
      }

      const match = await compare(password, userPw)

      if(match){
         req.session.userId = email

         return res.sendStatus(200)
      }

      next(ApiError.forbidden('Email or Password did not match...'))
   },
   getUser: async (req: Request, res: Response, next: NextFunction) => {

      const { userId } = req.session

      const user = await service.user.findUserByEmail(userId!)

      if(user instanceof ApiError){
         return next(user)
      }
   
      res.send(user)
   },
   postLogout: async (req: Request, res: Response, next: NextFunction) => {

      try{
         req.session.destroy

         res.clearCookie('sessionID')
         res.sendStatus(200)
      } catch(err){
         next(ApiError.badRequest('Logout Unsuccessful, please try again...'))
      }
   }
}

export default user;