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

import { ExercisesForCard } from '../exercisesForCard/exercisesForCard.entity';
import { User } from '../user/user.entity';

import { CardType } from './types';

@Entity('card')
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  categoryCustomId: number;

  @Column()
  cardType: CardType;

  @Column('simple-json', { nullable: true })
  image: {
    original: string;
    thumbnail: string;
    name: string;
  } | null;

  @Column()
  description: string;

  @Column({ name: 'html_content' })
  htmlContent: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.cards)
  tutor: User;

  // @OneToOne(() => FavouriteCard, (favouriteCard) => favouriteCard.card)
  // favouriteCard: FavouriteCard;

  @OneToMany(
    () => ExercisesForCard,
    (exercisesForCard) => exercisesForCard.card,
  )
  exercisesForCard: ExercisesForCard[];
}
