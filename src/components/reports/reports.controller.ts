import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Response } from 'express';
import { Public } from '../auth/guards/public';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('create')
  @ApiOperation({summary:"creates a report on a product or shop"})
  @ApiResponse({
    status: 200,
    description: "succesfully created a report"
  })
  create(@Body() createReportDto: CreateReportDto,@Res() response: Response) {
    return this.reportsService.create(createReportDto,response);
  }

  @Get('all')
  @ApiOperation({summary: "Fetch a list of reports for the admnin"})
  @ApiOkResponse({
    description: "List of reports fetched successfully"
  })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Fetch a spcific report by id"})
  @ApiOkResponse({
    description: "Specific report fetched successfully"
  })
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Update report details"})
  @ApiOkResponse({
    description: "Successfully updated a report"
  })
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Patch(':userid/deactivate/:id')
  @ApiOperation({summary: "Deactivate a user account by admins only"})
  @ApiOkResponse({
    description: "Successfully deactivated a user account"
  })
  deactivateUser(@Param('userid') userid:number,@Param('id') id:number,@Body('days') days:number, @Res() response : Response) {
    return this.reportsService.deactivateUser(userid,days,id,response)
  } 
  @Delete(':id')
  @ApiOperation({summary: "deletes a specific report by id"})
  @ApiOkResponse({
    description: "Successfully deleted a report"
  })

  remove(@Param('id') id: string,@Res() response:Response) {
    return this.reportsService.remove(+id,response);
  }
}
