import { Module } from '@nestjs/common';

import { CategoriesEntityModule } from '@db/entities/categories/categoriesEntity.module';

import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';

@Module({
  imports: [CategoriesEntityModule],
  providers: [GeneralService],
  controllers: [GeneralController],
})
export class GeneralModule {}
