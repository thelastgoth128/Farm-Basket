import { IsEmail, IsInt, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/components/enums/role.enums";


export class CreateUserDto {

    @IsString()
   name : string
   
   @IsEmail()
   email : string
   
   @IsStrongPassword()
   password : string

   @IsString()
   role : Role

   @IsString()
   location : string
}
