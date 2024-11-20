import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsString()
    amount : string

    @IsNotEmpty()
    @IsString()
    currency :string

    @IsNotEmpty()
    @IsString()
    email : string

    @IsNotEmpty()
    @IsString()
    tx_ref: string

    @IsOptional()
    @IsString()
    mobile : string

    @IsOptional()
    @IsString()
    name: string

}
