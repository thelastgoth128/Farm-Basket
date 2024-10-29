import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['jwt'];
        if(token){
            try{
                const decoded = jwt.verify(token,'hello')
                req.user = decoded as any
            }catch(error){
                console.error('JWT verification failed:', error)
            }
        }
        next()
    }
}