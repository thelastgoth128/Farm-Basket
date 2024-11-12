import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateReportDto {
@IsInt()
reporter : number

@IsInt()
product : number

@IsString()
reason : string

@IsString()
details : string

@IsString()
status : string

@IsDateString()
reported_date : Date

@IsString()
resolution_details : string

@IsDateString()
resolution_date : Date

@IsInt()
ban_duartion : number

@IsString()
punishment : string

}
