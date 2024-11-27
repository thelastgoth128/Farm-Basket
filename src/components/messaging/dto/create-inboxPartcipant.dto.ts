import { IsInt, IsNotEmpty } from "class-validator";


export class CreateInboxParticipants {
    @IsInt()
    @IsNotEmpty()
    inboxid : number

    @IsInt()
    @IsNotEmpty()
    userid : number[]
}