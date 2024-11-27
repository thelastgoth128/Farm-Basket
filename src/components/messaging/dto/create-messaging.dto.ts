import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateMessagingDto {
    @IsInt()
    userid: number

    @IsInt()
    inboxid : number

    @IsString()
    @IsNotEmpty()
    messages : string
}
