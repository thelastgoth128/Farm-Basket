import { BadRequestException, Injectable, Res } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as bcrypt from 'bcrypt'
import { nanoid } from "nanoid";
import { MailService } from "../services.ts/mail.service";
import { addMinutes } from 'date-fns'
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(Users)
        private readonly userep : Repository<Users>,
        private readonly userService : UsersService,
        private readonly jwtService : JwtService,
        private readonly mailService : MailService,
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
        const jwt = await this.jwtService.signAsync(payload, {secret:process.env.JWT_SECRET})
        return { 
            access_token : jwt
        }
    }

    async forgotPassword(email:string){
        const user = await this.userService.findMail(email)

        if (user){
            const reset_token = nanoid(64)
            const expirationTime = addMinutes(new Date(), 60)

            await this.userService.saveResetToken(email,reset_token,expirationTime)
            await this.mailService.sendPasswordResetEmail(email, reset_token)
        }
        return{
            message : 'if this user exists, they will receive an email'
        }
    }

    async verifyResetToken(email :string, token: string){
        const user = await this.userService.findMail(email);
        if(!user || !user.reset_token || !user.reset_token_expiry){
            throw new Error('Invalid or expired token')
        }

        const now = new Date()
        if (now > new Date(user.reset_token_expiry)){
            throw new Error('Token has expired')
        }

        if (user.reset_token !== token){
            throw new Error('Invalid token')
        } 
        return user
    }

    async resetPassword(user: Users, newPassword: string){
        user.password = await this.hashPassword(newPassword)
        user.reset_token = null
        user.reset_token_expiry = null

        await this.userep.save(user)

        return {
            message: 'Password has been successfully reset'
        }
    }
    private async hashPassword(password: string) {
        const hashPassword = await bcrypt.hash(password,12)
        return hashPassword
    }

    async logout( res:Response){
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true,
            
        })
        return({
            message : "you have logged out"
        })
    }
}