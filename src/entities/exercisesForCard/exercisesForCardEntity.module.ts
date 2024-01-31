import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExercisesForCard } from './exercisesForCard.entity';
import { ExercisesForCardEntityService } from './exercisesForCardEntity.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExercisesForCard])],
  providers: [ExercisesForCardEntityService],
  exports: [ExercisesForCardEntityService],
})
export class ExercisesForCardEntityModule {}
