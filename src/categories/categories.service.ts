import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>){}

  async create() {
    const categories: CreateCategoryDto[] = [
      {id: 1, name: 'Pants'},
      {id: 2, name: 'Shirt'},
    ];
    return this.categoryRepository.save(categories);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    categories.sort((a, b) => a.id - b.id);
    return categories;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
