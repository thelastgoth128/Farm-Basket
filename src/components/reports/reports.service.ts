import { Inject, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from './entities/report.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Products } from '../products/entities/product.entity';
import { Response } from 'express';
import { ReportStatus } from '../enums/report.status.enum';
import { UsersService } from '../users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AccountStatus } from '../enums/status.enums';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private readonly reportRep : Repository<Reports>,
    @InjectRepository(Users)
    private readonly userrep : Repository<Users>,
    @InjectRepository(Products)
    private productrep : Repository<Products>,
    @Inject()
    private userService : UsersService
  ){}

  async create(createReportDto: CreateReportDto,@Res() res:Response) {
    try {
      const{ product, reporter, ...ReportData } = createReportDto
      const user = await this.userrep.findOne({where : {userid : reporter}})
      const productid = await this.productrep.findOne({where: {productid : product}})
    
      if (!user) {
        throw new NotFoundException('User not found')
      }
      if (!productid) {
        throw new NotFoundException('Product not found')
      }
      const report = new Reports()
      report.reporter = user
      report.product = productid
      report.reported_date = new Date
      report.reason = createReportDto.reason
      report.details =createReportDto.details
      report.status = ReportStatus.PENDING
      await this.reportRep.save(report)
      
      res.status(201).json ({
        message : "Reported Successfully"
      })
    }catch (error){
      res.status(500).json({
        message : "Internal Server Error"
      })
    }
      
  }

  async findAll() {
    return await this.reportRep.find() 
  }

  async findOne(id: number) {
    return await this.reportRep.findOne({where : {id}})
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.reportRep.findOne({where : {id}})
    if (!report){
      throw new NotFoundException('Report Not Found')
    }
    updateReportDto.resolution_date = new Date
    updateReportDto.status = ReportStatus.RESOLVED
    Object.assign(report,updateReportDto)
    return await this.reportRep.save(report)
  }

  async deactivateUser(userid : number, days: number,id : number,@Res() res:Response): Promise<void> {
    const user = await this.userrep.findOne({where : { userid}})
    const report = await this.reportRep.findOne({where : {id}})

    if (!user) {
      throw new NotFoundException('user not found')
    }

    if (!report){
      throw new NotFoundException('report not found')
    }
    
    const banEndDate = new Date()
    banEndDate.setDate(banEndDate.getDate() + days)
    
    await this.userService.deactiveUser(user.userid)
    report.ban_duration = days
    report.ban_enddate = banEndDate
    report.status = ReportStatus.RESOLVED
    report.resolution_date = new Date()

    await this.reportRep.save(report)

    try{
      res.status(200).json({
        message : 'Successfully set punishment'
      })
    }catch (error){
      res.status(500).json({
        message : 'Internal Server error'
      })
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async chechExpiredBans() : Promise<void> {
    const now = new Date()
    const reportsWithDeactivate = await this.reportRep.find({
      where: {ban_enddate : LessThanOrEqual(now)},relations:['reporter']
    })

    for (const report of reportsWithDeactivate) {
      const user = report.reporter
      if(user.status === AccountStatus.DEACTIVATED) {
        user.status = AccountStatus.ACTIVE;
        await this.userrep.save(user)
      }
      report.ban_duration = null
      report.ban_enddate = null
      await this.reportRep.save(report)
    }
  }

  async remove(id: number,@Res() res:Response) {
    const report = await this.reportRep.findOne({where: {id}})

    if (!report) {
      throw new NotFoundException('Report Not Found')
    }
    await this.reportRep.remove(report)
    try {
      res.status(200).json({
        message : 'Successfully deleted Report'
      })
    }catch(error){
      res.status(500).json({
        message : 'Internal Server Error'
      })
    }
  }
}
