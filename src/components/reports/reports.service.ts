import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Request, response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from './entities/report.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Products } from '../products/entities/product.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private readonly reportRep : Repository<Reports>,
    @InjectRepository(Users)
    private readonly userrep : Repository<Users>,
    @InjectRepository(Products)
    private productrep : Repository<Products>
  ){}
  async create(createReportDto: CreateReportDto,@Req() req: Request) {
    try {

      const{ product, reporter, ...ReportData } = createReportDto
      const userid = req.user?.userid
      const user = await this.userrep.findOne({where : {userid}})
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
      await this.reportRep.save(report)
      
      response.status(201).json ({
        message : "Reported Successfully"
      })
    }catch (error){
      response.status(500).json({
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
    Object.assign(report,updateReportDto)
    return await this.reportRep.save(report)
  }

  async remove(id: number) {
    const report = await this.reportRep.findOne({where: {id}})

    if (!report) {
      throw new NotFoundException('Report Not Found')
    }
    return await this.reportRep.remove(report)
  }
}
