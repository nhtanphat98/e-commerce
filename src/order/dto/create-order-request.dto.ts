import { CreateOrderDetailDto } from 'src/order-detail/dto/create-order-detail.dto';
import { CreateOrderDto } from './create-order.dto';

export class CreateOrderRequestDto {
  createOrderDto: CreateOrderDto;
  createOrderDetailDto: CreateOrderDetailDto[];
}
