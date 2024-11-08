import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Public } from "./guards/public";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { UsersService } from "../users/users.service";


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService : UsersService
     ){}

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

    @Post('reset-password')
    async resetPassword(
        @Body('email') email: string,
        @Body('token') token : string,
        @Body('newPassword') newPassword: string
    ){
        const user = await this.authService.verifyResetToken(email,token)
        return this.authService.resetPassword(user,newPassword)
    }

    @Post('logout')
    logout(@Res({passthrough:true}) response:Response){
        return this.authService.logout(response)
    }
  
}