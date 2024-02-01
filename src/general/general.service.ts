import { Injectable } from '@nestjs/common';

import { Categories } from '@db/entities/categories/categories.entity';
import { CategoriesEntityService } from '@db/entities/categories/categoriesEntity.service';

@Injectable()
export class GeneralService {
  constructor(readonly categoriesEntityService: CategoriesEntityService) {}
  getCategories(): Promise<Categories[]> {
    return this.categoriesEntityService.getCategories();
  }
}
