import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RequestService } from '../../request.service';

import { Exercise } from './exercise.entity';
import { QueryGetExercises } from './types';

@Injectable()
export class ExerciseEntityService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    readonly requestService: RequestService,
  ) {}
  getExercise(id: string): Promise<Exercise> {
    return this.exerciseRepository.findOne({ where: { id } });
  }

  async getExercises({
    searchValue,
    tutorId,
    exerciseType,
    exerciseIds,
    size = 20,
    page = 0,
  }: QueryGetExercises): Promise<[Exercise[], number]> {
    const query = Exercise.createQueryBuilder('exercise').where(
      'exercise.categoryCustomId = :categoryCustomId',
      {
        categoryCustomId: this.requestService.selectedCategory,
      },
    );

    if (tutorId) {
      query.andWhere(
        `((exercise.tutorId = :tutorId and exercise.exerciseType = 'private') or exercise.exerciseType = 'public')`,
        { tutorId },
      );
    }

    if (exerciseType) {
      query.andWhere('exercise.exerciseType = :exerciseType', { exerciseType });
    }

    if (exerciseIds?.length) {
      query.andWhere('exercise.id IN (:...exerciseIds)', { exerciseIds });
    }

    if (searchValue?.toString()) {
      query.andWhere('(exercise.name ILIKE :value)', {
        value: `%${searchValue}%`,
      });
    }

    return query
      .skip(size * page)
      .take(size)
      .getManyAndCount();
  }
}
