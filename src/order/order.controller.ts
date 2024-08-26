import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderRequestDto: CreateOrderRequestDto) {
    return await this.orderService.create(createOrderRequestDto);
  }

  @Get()
  async findAllByUserId(@Query('userId') userId: number) {
    return await this.orderService.findAllByUserId(userId);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.orderService.findOne(+id);
  // }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(+id);
  }
}
