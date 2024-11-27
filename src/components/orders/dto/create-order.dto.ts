import { IsInt, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    cart : number

    @IsInt()
    userid : number

    @IsInt()
    payment : number
}
