import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) { }
  async create(createOrderRequestDto: CreateOrderRequestDto) {
    const order = await this.orderRepository.save(
      createOrderRequestDto.createOrderDto,
    );
    createOrderRequestDto.createOrderDetailDto.forEach((createOrderDetail) => {
      createOrderDetail.order_id = order.id;
    });
    await this.orderDetailRepository.save(
      createOrderRequestDto.createOrderDetailDto,
    );
  }

  async findAllByUserId(user_id: number) {
    const queryBuilder = await this.orderRepository.createQueryBuilder('order');
    queryBuilder.leftJoinAndSelect('order.orderDetails', 'order-detail');
    const orders = queryBuilder
      .where('order.userId = :user_id', { user_id: user_id })
      .getMany();
    return orders
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({ where: { id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This ac tion removes a #${id} order`;
  }
}
