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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchFilter } from './dto/searchFilter.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create() {
    return this.productsService.create();
  }

  @Get()
  FindAll(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('rating') rating?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('category_id') category_id?: string,
  ) {
    // Tạo đối tượng searchFilter từ các tham số query
    const searchFilter: SearchFilter = {
      name: name,
      status: status,
      rating: rating ? parseFloat(rating) : undefined,
      rangePrice:
        minPrice !== undefined && maxPrice !== undefined
          ? [minPrice, maxPrice]
          : undefined,
      category_id: category_id ? parseInt(category_id) : undefined,
    };

    // Gọi phương thức tìm kiếm trong service với các tham số
    return this.productsService.findAll({ pageNumber, pageSize, searchFilter });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
