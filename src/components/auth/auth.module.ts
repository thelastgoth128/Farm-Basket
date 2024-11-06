import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/authGuard";
import { MailService } from "../services.ts/mail.service";
import { UsersService } from "../users/users.service";


@Module({
    imports:[
        UsersModule,
        JwtModule.register({
            global:true,
            secret:'hello',
            signOptions:{ expiresIn: '1d'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService,{
        provide:APP_GUARD,
        useClass:AuthGuard
    },MailService]
})
export class AuthModule {}