import { Controller, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhooks')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService
  ) {}

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
