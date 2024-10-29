import { BadRequestException, Injectable, Res } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as bcrypt from 'bcrypt'
import { nanoid } from "nanoid";
import { MailService } from "../services.ts/mail.service";


@Injectable()
export class AuthService{
    constructor(
        private userService : UsersService,
        private jwtService : JwtService,
        private mailService : MailService,
    ){}

    async signIn(email :string, pass: string,@Res({passthrough:true}) response : Response){
        const user = await this.userService.findMail(email)
        if (!user){
            throw new BadRequestException('wrong credentials')
        }
        if(!await bcrypt.compare(pass,user.password)){
            throw new BadRequestException('wrong credentials')
        }
        const payload = {userid : user.userid, email: user.email, name:user.name, role: user.role, location: user.location}
        const jwt = await this.jwtService.signAsync(payload)
        response.cookie('jwt',jwt,{httpOnly:true,secure:true,maxAge:360000})

        return { 
            message : 'succesfully logged in' 
        }
    }

    async forgotPassword(email:string){
        const user = await this.userService.findMail(email)

        if (user){
            const resetToken = nanoid(64)
            await this.mailService.sendPasswordResetEmail(email, resetToken)
        }
        return{
            message : 'is this user exists, they will receive an email'
        }
    }

    async logout(req: Request, res:Response){
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true,
            
        })
    }
}