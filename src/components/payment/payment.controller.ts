import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from '../auth/guards/public';
import { InitialPayoutDto } from './dto/create-initialpayout.dto';
import { Request } from 'express';

@Public()
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('make-payment')
  create(@Body() createPaymentDto: CreatePaymentDto, @Req() req:Request) {
    return this.paymentService.processPayment(createPaymentDto,req);
  }

  @Post('cash-out')
  initiatePayout(@Body() initialPayoutDto: InitialPayoutDto) {
    const { mobile, amount } = initialPayoutDto
    return this.paymentService.initiatePayout(mobile,amount)
  }

  @Get('status/:tx_ref')
  getPaymentsStatus(@Param('tx_ref') tx_ref : string) {
    return this.paymentService.getPaymentStatus(tx_ref)
  }

  @Get('verify/:tx_ref')
  verifyPaymnet(@Param('tx_ref') tx_ref:string) {
    return this.paymentService.verifyPayment(tx_ref)
  }
}
