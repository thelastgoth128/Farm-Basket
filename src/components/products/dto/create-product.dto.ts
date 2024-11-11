import { isInt, IsInt, IsString } from "class-validator";

export class CreateProductDto {
    
    @IsInt()
    userid : number

    @IsString()
    name : string

    @IsString()
    description : string

    @IsInt()
    quantity : number

    @IsInt()
    price : number

    @IsString()
    type : string
}
