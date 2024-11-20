import { HttpException, HttpStatus, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Users } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Payments } from './entities/payment.entity';
import { v4 as uuidv4 } from 'uuid'
import { firstValueFrom } from 'rxjs';
import { PaymentStatus } from '../enums/payment.enum';
import { Request } from 'express';
import { Products } from '../products/entities/product.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentrep : Repository<Payments>,
    @InjectRepository(Users)
    private readonly usersrep : Repository<Users>,
    private httpService : HttpService,
    @InjectRepository(Products)
    private readonly productrep : Repository<Products>,

  ){}

  private readonly operatorIds = {
    '8': '27494cb5-ba9e-437f-a114-4e7a7686bcca',
    '9': '20be6c20-adeb-4b5b-a7ba-0769820df4fb',
  }

  private getMobileMoneyOperatorIds(mobile : string) {
    const prefix = mobile.charAt(0)
    const refId = this.operatorIds[prefix]
    if (!refId) {
      throw new HttpException('Unsupported mobile number', HttpStatus.BAD_REQUEST)
    }
    return refId
  }

  private transactionId():string {
    return uuidv4()
  }

  async processPayment(createPaymentDto : CreatePaymentDto,@Req() req:Request): Promise<any> {
    const { amount,mobile } = createPaymentDto
    const mobileMoneyOperatorId = this.getMobileMoneyOperatorIds(mobile)
    const charge_id = this.transactionId()
    const name = req.user?.name
    const email = req.user?.email
    const userid = req.user?.userid

    createPaymentDto.tx_ref = this.transactionId()

    const user = await this.usersrep.findOne({where : {userid}});

  
    const payment = new Payments()
      payment.tx_ref = createPaymentDto.tx_ref,
      payment.amount = amount,
      payment.mobile = mobile,
      payment.currency = 'MWK',
      payment.status= PaymentStatus.PENDING,
      payment.charges = 0,
      payment.created_at = new Date(),
      payment.completed_at= null,
      payment.user = user,
    
      await this.paymentrep.save(payment)

    const options = {
      headers: {
        accept : 'application/json',
        'content-type' : 'application/json',
        Authorization : `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`
      }
    }

    try {
      const response = await firstValueFrom (
        this.httpService.post(
          'https://api.paychangu.com/mobile-money/payments/initialize',
          {
            ...createPaymentDto,
            mobile,
            mobile_money_operator_ref_id: mobileMoneyOperatorId,
            amount : amount,
            charge_id: charge_id,
            created_at : new Date(),
            first_name : name,
            email,
          },
          options
        )
      )
      const data = response.data

      if ( data.status === 'success') {
        payment.status = PaymentStatus.COMPLETED
        payment.charges = data.data.charges || 0
        payment.completed_at = new Date()
        await this.paymentrep.save(payment)

        return {
          statusCode: 200,
          message: 'Payment initiated successfully',
          data: data.data,
        }
      }else {
        throw new Error(data.message || 'Payment initiation failed.')
      }
    }catch (error) {
      console.error(
        'Error processing payment:',
        error.response?.data || error.message,
      );
    }
  }


  async getPaymentStatus(tx_ref: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://api.paychangu.com/payment/status/${tx_ref}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
          }
        }
        )
      )
      const data = response.data
      if (data.status === 'success') {
        return {
          statusCode: 200,
          message: 'Payment status retrieved successfully.',
          data: data.data
        }
      }else {
        throw new Error(data.message)
      }
    }catch (error) {
      console.error(
        'Error retrieving payment status:',
         error.message
      )
      throw new Error(
        error.response?.data?.message 
      )
    }  
  }

  async verifyPayment(tx_ref : string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://api.paychangu.com/verify-payment/${tx_ref}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
              
          }
        }
        )
      )
      const data = response.data

      if (data.status === 'success') {
        const details = data.data
        
        return {
          statusCode : 200,
          message : 'Payment verified successfully',
          data: details
        }
      }else {
        throw new HttpException(
          data.message || 'Payment verification failed.',
          HttpStatus.BAD_REQUEST,
        )
      }
    }catch (error) {
      console.error(
        'Error verifying payment:',
        error?.response?.data || error.message,
      )
      throw new HttpException(
        error?.resposne?.data?.message || 'An error occured while verifying payment.',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }


  async initiatePayout(mobile:string, amount : string): Promise<any> {
    const mobileMoneyOperatorId = this.getMobileMoneyOperatorIds(mobile)
    const charge_id = this.transactionId()

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.paychangu.com/mobile-money/payments/initialize',
          {
            mobile,
            mobile_money_operator_ref_id: mobileMoneyOperatorId,
            amount,
            charge_id
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          }
        )
      )

      
      if (response.data.status === 'success') {
        return {
          statusCode: 200,
          message: 'Payout initiated successfully.',
          data: response.data.data,
        };
      } else {
        throw new HttpException('Failed to initiate mobile money payout.', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.error('Error initiating payout:', error.response?.data || error.message);
      throw new HttpException('An error occurred while processing payout.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}