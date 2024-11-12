import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Response } from 'express';
import { Public } from '../auth/guards/public';

@Public()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('create')
  create(@Body() createReportDto: CreateReportDto,@Res() response: Response) {
    return this.reportsService.create(createReportDto,response);
  }

  @Get('all')
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Patch(':userid/deactivate/:id')
  deactivateUser(@Param('userid') userid:number,@Param('id') id:number,@Body('days') days:number, @Res() response : Response) {
    return this.reportsService.deactivateUser(userid,days,id,response)
  } 
  @Delete(':id')
  remove(@Param('id') id: string,@Res() response:Response) {
    return this.reportsService.remove(+id,response);
  }
}
