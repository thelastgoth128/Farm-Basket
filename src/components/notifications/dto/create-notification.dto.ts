import { IsBoolean, IsDateString, IsInt, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsInt()
    user : number

    @IsString()
    text : string

    @IsBoolean()
    isread : boolean

    @IsDateString()
    created_at : Date
}
