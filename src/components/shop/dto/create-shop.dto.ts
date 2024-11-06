import { IsInt, IsString } from "class-validator";


export class CreateShopDto {

    @IsInt()
    owner  :number

    @IsString()
    name : string

    
}
