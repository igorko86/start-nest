import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Categories } from './categories.entity';
import { CategoriesEntityService } from './categoriesEntity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [CategoriesEntityService],
  exports: [CategoriesEntityService],
})
export class CategoriesEntityModule {}
