import { verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
dotenv.config();


export default (req: any , res: any, next: any)=>{
    const token = req.headers.access_token as string
    if(!token) return res.status(401).send( {error: 'Access denied'} )
        try{
            const decodedUser = verify(token, process.env.JWT_SECRET_KEY!)
            req.user = decodedUser
          
        }catch(error){
            res.status(400).send('Invalid Token')
        }
        return next()

}