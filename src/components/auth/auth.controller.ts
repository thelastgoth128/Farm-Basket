import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}

    @Post('login')
    signIn(@Body() signInDto:Record<string,any>,@Res({passthrough:true}) response:Response){
        return this.authService.signIn(signInDto.email,signInDto.password,response)
    }
}