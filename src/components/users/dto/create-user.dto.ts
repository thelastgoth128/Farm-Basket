import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { Roles } from "src/components/decorators/roles.decorators";
import { Role } from "src/components/enums/role.enums";


export class CreateUserDto {

    @ApiProperty({
        description: "the name of the user",
        example: 'J.R.R Tolkien'
    })
    @IsString()
   name : string
   
   @ApiProperty({
    description:"unique email of user "
   })
   @IsEmail()
   email : string
   
   @ApiProperty({
    description: "password for a user"
   })
   @IsStrongPassword()
   password : string

   @ApiProperty({
    description:"role of a user"
   })
   @IsString()
   role : Role

   @ApiProperty({
    description:"location of the user"
   })
   @IsString()
   location : string

   @IsString()
   reset_token : string

   @IsString()
   reset_token_expiry: Date
   
}
