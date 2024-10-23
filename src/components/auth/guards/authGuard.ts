import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { access } from "fs";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "./public";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService,private reflector:Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic){
            return true
        }
        const request = context.switchToHttp().getRequest()
        const token = request.cookies['jwt']

        if (!token){
            throw new UnauthorizedException('you have no token')
        }
        try{
            const data = await this.jwtService.verifyAsync(token,
                {
                    secret:'hello'
                }
            )
            request['user'] =data
        }catch(error){
            throw new UnauthorizedException('access denied:', error)
        }
        return true
    }
}