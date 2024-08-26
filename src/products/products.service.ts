import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ResponseProduct } from './dto/response-product.dto';
import { SearchFilter } from './dto/searchFilter.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll({
    pageNumber,
    pageSize,
    searchFilter,
  }: {
    pageNumber: number;
    pageSize: number;
    searchFilter: SearchFilter;
  }): Promise<ResponseProduct> {
    //using query builder
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    // Áp dụng các điều kiện lọc từ searchFilter
    if (searchFilter.name) {
      queryBuilder.andWhere('product.name LIKE :name', {
        name: `%${searchFilter.name}%`,
      });
    }
    if (searchFilter.rangePrice) {
      queryBuilder.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: searchFilter.rangePrice[0],
        maxPrice: searchFilter.rangePrice[1],
      });
    }
    if (searchFilter.status) {
      queryBuilder.andWhere('product.status = :status', {
        status: `${searchFilter.status}`,
      });
    }
    if (searchFilter.rating) {
      queryBuilder.andWhere('product.rating = :rating', {
        rating: `${searchFilter.rating}`,
      });
    }
    if (searchFilter.category_id) {
      queryBuilder.andWhere('product.category_id = :category_id', {
        category_id: `${searchFilter.category_id}`,
      });
    }
    const [results, total] = await queryBuilder
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const totalPages = Math.ceil(total / pageSize);
    const response: ResponseProduct = {
      data: results,
      total: total,
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalPages: totalPages,
    };
    return response;
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return await this.productRepository.remove(product);
  }
}
