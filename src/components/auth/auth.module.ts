import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/authGuard";


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
    }]
})
export class AuthModule {}