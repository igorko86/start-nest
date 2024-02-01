import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Categories } from './categories.entity';

@Injectable()
export class CategoriesEntityService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  getCategories() {
    return this.categoriesRepository.find();
  }
}
