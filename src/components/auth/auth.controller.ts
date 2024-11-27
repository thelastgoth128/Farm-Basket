import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Public } from "./guards/public";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { UsersService } from "../users/users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService : UsersService
     ){}

    @Public()
    @Post('login')
    @ApiOperation({summary: "logins a user"})
    @ApiResponse({
    status: 201,
    description: "Successfully logged in"
  })
    signIn(@Body() signInDto:Record<string,any>,@Res({passthrough:true}) response:Response){
        return this.authService.signIn(signInDto.email,signInDto.password,response)
    }

    @Public()
    @Post('forgot-password')
    @ApiOperation({summary: "sends an email to user where they can reset there password"})
    @ApiResponse({
    status: 201,
    description: "upon success you will receive an email to reset password "
  })
    forgotpassword(@Body() forgotpasswordDto : ForgotPasswordDto){
        return this.authService.forgotPassword(forgotpasswordDto.email)
    }

    @Post('reset-password')
    @ApiOperation({summary: "used to reset a user's password"})
    @ApiResponse({
    status: 201,
    description: "Successfully resets a user's password"
  })
    async resetPassword(
        @Body('email') email: string,
        @Body('token') token : string,
        @Body('newPassword') newPassword: string
    ){
        const user = await this.authService.verifyResetToken(email,token)
        return this.authService.resetPassword(user,newPassword)
    }

    @Post('logout')
    @ApiOperation({summary: "deletes a users token"})
    @ApiResponse({
    status: 201,
    description: "Successfully logged out the user"
  })
    logout(@Res({passthrough:true}) response:Response){
        return this.authService.logout(response)
    }
  
}