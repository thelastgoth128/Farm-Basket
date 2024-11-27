import { IsArray, IsInt, IsNotEmpty } from "class-validator";


export class CreateInboxDto {
    @IsArray()
    @IsNotEmpty()
    userid : number[]
}