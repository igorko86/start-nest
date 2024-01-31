import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestService } from '../../request.service';

import { Exercise } from './exercise.entity';
import { ExerciseEntityService } from './exerciseEntity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExerciseEntityService, RequestService],
  exports: [ExerciseEntityService],
})
export class ExerciseEntityModule {}
