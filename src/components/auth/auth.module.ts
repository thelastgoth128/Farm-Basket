import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/authGuard";
import { MailService } from "../services.ts/mail.service";

@Module({
    imports:[
        UsersModule,
        JwtModule.register({
            global:true,
            secret:process.env.JWT_SECRET,
            signOptions:{ expiresIn: '1d'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService,{
        provide:APP_GUARD,
        useClass:AuthGuard
    },MailService,JwtService],
    exports:[JwtService]
})
export class AuthModule {}