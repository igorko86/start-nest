import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Card } from '@db/entities/cards/card.entity';
import { Exercise } from '@db/entities/exercise/exercise.entity';

@Entity('exercisesForCard')
export class ExercisesForCard extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Card, (card) => card.exercisesForCard)
  card: Card;

  @ManyToOne(() => Exercise, (exercise) => exercise.exercisesForCard)
  exercise: Exercise;
}
