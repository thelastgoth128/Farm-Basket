import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateReportDto {
@IsInt()
reporter : number

@IsInt()
product : number

@IsString()
reason : number

@IsString()
details : number

@IsString()
status : number

@IsDateString()
reported_date : Date

@IsString()
resolution_details : string

@IsDateString()
reolution_date : Date

@IsInt()
ban_duartion : number

@IsString()
punishment : string

}
