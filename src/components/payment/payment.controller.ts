import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from '../auth/guards/public';
import { InitialPayoutDto } from './dto/create-initialpayout.dto';
import { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enums';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('make-payment')
  @ApiOperation({summary:"Makes a payments using PayChangu"})
  @ApiResponse({
    status:201,
    description: "Successfully made payment"
  })
  create(@Body() createPaymentDto: CreatePaymentDto, @Req() req:Request) {
    return this.paymentService.processPayment(createPaymentDto,req);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('cash-out')
  @ApiOperation({summary:"Cashes out money to any account specified"})
  @ApiResponse({
    status:201,
    description: "Successfully cashed out"
  })
  initiatePayout(@Body() initialPayoutDto: InitialPayoutDto) {
    const { mobile, amount } = initialPayoutDto
    return this.paymentService.initiatePayout(mobile,amount)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('status/:tx_ref')
  @ApiOperation({summary:"Gets a paymeny status from paychangu"})
  @ApiOkResponse({
    description: "Status successfully fetched"
  })
  getPaymentsStatus(@Param('tx_ref') tx_ref : string) {
    return this.paymentService.getPaymentStatus(tx_ref)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('verify/:tx_ref')
  @ApiOperation({summary:"Verifies a payment"})
  @ApiOkResponse({
    description: "Payment is successful"
  })
  verifyPaymnet(@Param('tx_ref') tx_ref:string) {
    return this.paymentService.verifyPayment(tx_ref)
  }
}
