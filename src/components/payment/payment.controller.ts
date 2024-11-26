import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from '../auth/guards/public';
import { InitialPayoutDto } from './dto/create-initialpayout.dto';
import { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Public()
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

  @Get('status/:tx_ref')
  @ApiOperation({summary:"Gets a paymeny status from paychangu"})
  @ApiOkResponse({
    description: "Status successfully fetched"
  })
  getPaymentsStatus(@Param('tx_ref') tx_ref : string) {
    return this.paymentService.getPaymentStatus(tx_ref)
  }

  @Get('verify/:tx_ref')
  @ApiOperation({summary:"Verifies a payment"})
  @ApiOkResponse({
    description: "Payment is successful"
  })
  verifyPaymnet(@Param('tx_ref') tx_ref:string) {
    return this.paymentService.verifyPayment(tx_ref)
  }
}
