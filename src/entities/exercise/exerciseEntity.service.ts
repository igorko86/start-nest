import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseEntityService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}
  getExercise(id: string): Promise<Exercise> {
    return this.exerciseRepository.findOne({ where: { id } });
  }
}
