import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderrep: Repository<Order>,
  ){}

  async findAll() {
    return await this.orderrep.find() 
  }

  async findOne(id: number) {
    return  await this.orderrep.findOne({where: {id}})
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    const order = await this.orderrep.findOne({where: {id}})
    if (!order) {
      throw new NotFoundException('Order not found')
    }
    return await this.orderrep.remove(order)
  }
}
