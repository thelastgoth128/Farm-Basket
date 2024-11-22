import { Controller, Post, Get, Patch, Delete, Param, Body, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Request } from 'express';
import { Public } from '../auth/guards/public';

@Public()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addItem(@Req() req: Request, @Body() createCartItemDto: CreateCartItemDto) {
    const userId = req.user?.userid;
    return this.cartService.addItem(userId, createCartItemDto);
  }

  @Patch('update/:itemId')
  updateItem(@Req() req: Request, @Param('itemId') itemId: number, @Body() updateCartItemDto: UpdateCartItemDto) {
    const userId = req.user?.userid;
    return this.cartService.updateItem(userId, itemId, updateCartItemDto);
  }

  @Delete('remove/:itemId')
  removeItem(@Req() req: Request, @Param('itemId') itemId: number) {
    const userId = req.user?.userid;
    return this.cartService.removeItem(userId, itemId);
  }

  @Get('summary')
  getCartSummary(@Req() req: Request) {
    const userId = req.user?.userid;
    return this.cartService.getCartSummary(userId);
  }

  @Post('checkout')
  async checkout(@Req() req: Request) {
    const userId = req.user?.userid;
    const cart = await this.cartService.getCartSummary(userId);
    // Integrate the order placement and payment here
    await this.cartService.clearCart(userId);
    return { message: 'Checkout successful' };
  }
}