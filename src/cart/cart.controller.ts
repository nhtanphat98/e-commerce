import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return await this.cartService.create(createCartDto);
  }

  @Get()
  async findAllByUserId(@Param('userId') userId: number) {
    return await this.cartService.findAllByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartService.remove(+id);
  }
}
