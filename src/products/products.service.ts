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
  ) { }

  async create() {
    const products: CreateProductDto[] = [
      { name: 'Product 1', description: 'This is product 1', image: 'image1.jpg', quantity: 5, price: 3000 },
      { name: 'Product 2', description: 'This is product 2', image: 'image2.jpg', quantity: 10, price: 3500 },
      { name: 'Product 3', description: 'This is product 3', image: 'image3.jpg', quantity: 15, price: 4000 },
      { name: 'Product 4', description: 'This is product 4', image: 'image4.jpg', quantity: 20, price: 4500 },
      { name: 'Product 5', description: 'This is product 5', image: 'image5.jpg', quantity: 25, price: 5000 },
      { name: 'Product 6', description: 'This is product 6', image: 'image6.jpg', quantity: 30, price: 5500 },
      { name: 'Product 7', description: 'This is product 7', image: 'image7.jpg', quantity: 35, price: 6000 },
      { name: 'Product 8', description: 'This is product 8', image: 'image8.jpg', quantity: 40, price: 6500 },
      { name: 'Product 9', description: 'This is product 9', image: 'image9.jpg', quantity: 45, price: 7000 },
      { name: 'Product 10', description: 'This is product 10', image: 'image10.jpg', quantity: 50, price: 7500 },
      { name: 'Product 11', description: 'This is product 11', image: 'image11.jpg', quantity: 55, price: 8000 },
      { name: 'Product 12', description: 'This is product 12', image: 'image12.jpg', quantity: 60, price: 8500 },
      { name: 'Product 13', description: 'This is product 13', image: 'image13.jpg', quantity: 65, price: 9000 }

    ]
    return await this.productRepository.save(products);
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
      queryBuilder.andWhere('product.categoryId = :category_id', {
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
