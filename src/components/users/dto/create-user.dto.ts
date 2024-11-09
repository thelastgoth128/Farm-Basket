import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/components/enums/role.enums";


export class CreateUserDto {

    @ApiProperty({
        description: "the name of the user",
        example: 'J.R.R Tolkien'
    })
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

   @IsString()
   reset_token : string

   @IsString()
   reset_token_expiry: Date
   
}
