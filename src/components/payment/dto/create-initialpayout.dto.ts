import { IsNotEmpty, IsString } from "class-validator";

export class InitialPayoutDto {
    @IsString()
    @IsNotEmpty()
    mobile : string

    @IsString()
    @IsNotEmpty()
    amount : string
}