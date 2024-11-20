import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payments } from "../payment/entities/payment.entity";
import { Repository } from "typeorm";
import { Users } from "../users/entities/user.entity";
import { HttpService } from "@nestjs/axios";
import { PaymentStatus } from "../enums/payment.enum";
import { Webhook } from "./entities/webhook.entity";
import * as crypto from 'crypto'


@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(Webhook)
    private readonly webhookrep : Repository<Webhook>,
    @InjectRepository(Payments)
    private readonly paymentrep : Repository<Payments>,
    @InjectRepository(Users)
    private readonly usersrep : Repository<Users>,
    private httpService : HttpService
  ){}

  private async updatePaymentStatus(tx_ref: string, status:PaymentStatus): Promise<void> {
    const payment = await this.paymentrep.findOne({where : {tx_ref}})
    if (!payment) {
      throw new NotFoundException('payment not found')
    }
    payment.status = status;
    await this.paymentrep.save(payment)
  }
  
  private verifySignature(payload: any, signature:string) : boolean {
    const secret = process.env.PAYCHANGU_WEBHOOK_SECRET
    const hash = crypto.createHmac('sha265', secret)
    .update(JSON.stringify(payload))
    .digest('hex')
    return hash === signature
  }
  
  async handleWebhook(payload: any, signature:string): Promise<void> {
    if (!this.verifySignature(payload, signature)) {
      throw new HttpException('Inavlid signature', HttpStatus.UNAUTHORIZED)
    }
    const { tx_ref, status , event } = payload
  
    if ( event === 'payment.success') {
      await this.updatePaymentStatus(tx_ref, PaymentStatus.COMPLETED)
    } else if (event === 'payment.failed') {
      await this.updatePaymentStatus(tx_ref, PaymentStatus.FAILED)
    } else {
      console.warn('unhandled event type:', event)
    }

    const WebhookEvent = this.webhookrep.create({event,payload})
    await this.webhookrep.save(WebhookEvent)
  }

  
}
