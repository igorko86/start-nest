import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ExercisesForCard } from '@db/entities/exercisesForCard/exercisesForCard.entity';
import { User } from '@db/entities/user/user.entity';

import { ExerciseType, QuestionItem } from './types';

@Entity('exercise')
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'questions',
    type: 'json',
    nullable: false,
    default: [],
  })
  questions: QuestionItem[];

  @Column()
  categoryCustomId: number;

  @Column()
  exerciseType: ExerciseType;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: 'CASCADE' })
  tutor: User;

  // @OneToOne(
  //   () => FavouriteExercise,
  //   (favouriteExercise) => favouriteExercise.exercise,
  // )
  // favouriteExercise: FavouriteExercise;

  @OneToMany(() => ExercisesForCard, (exerciseCard) => exerciseCard.exercise)
  exercisesForCard: ExercisesForCard[];
}
