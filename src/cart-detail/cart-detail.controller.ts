import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';

@Controller('cart-detail')
export class CartDetailController {
  constructor(private readonly cartDetailService: CartDetailService) {}

  @Post()
  async create(@Body() createCartDetailDto: CreateCartDetailDto) {
    return await this.cartDetailService.create(createCartDetailDto);
  }

  @Get()
  async findAll() {
    return await this.cartDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartDetailService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartDetailDto: UpdateCartDetailDto,
  ) {
    return await this.cartDetailService.update(+id, updateCartDetailDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartDetailService.remove(+id);
  }
}
