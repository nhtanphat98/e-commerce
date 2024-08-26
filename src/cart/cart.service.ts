import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  async findAllByUserId(userId: number) {
    const queryBuilder = await this.cartRepository.createQueryBuilder('order');
    queryBuilder.leftJoinAndSelect('cart.user', 'user');
    const orders = queryBuilder
      .where('order.user_id = :user_id', { user_id: userId })
      .getMany();
    return orders;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
