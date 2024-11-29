import { Controller, Post, Body, Headers, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Public } from '../auth/guards/public';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Admin } from 'typeorm';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enums';

@Controller('webhooks')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService
  ) {}
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post('paychangu')
  async handlePayChanguWebhook(@Body() payload: any,@Headers('x-paychangu-signature') signature: string) {
    try {
      await this.webhookService.handleWebhook(payload, signature);
      return { status: 'success' };
    } catch (error) {
      throw new HttpException('Webhook handling failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
