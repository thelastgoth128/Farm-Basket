import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Public } from "./guards/public";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService ){}

    @Public()
    @Post('login')
    signIn(@Body() signInDto:Record<string,any>,@Res({passthrough:true}) response:Response){
        return this.authService.signIn(signInDto.email,signInDto.password,response)
    }

    @Public()
    @Post('forgot-password')
    forgotpassword(@Body() forgotpasswordDto : ForgotPasswordDto){
        return this.authService.forgotPassword(forgotpasswordDto.email)
    }

    @Post('logout')
    logout(@Res({passthrough:true}) response:Response){
        return this.authService.logout(response)
    }
  
}