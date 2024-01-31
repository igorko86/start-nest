import { CardType } from '@entities/cards/types';
import { ExerciseType } from '@entities/exercise/types';

type Card = {
  id: string;
  name: string;
  image: { original: string; thumbnail: string } | null;
};
export type CardList = {
  totalCount: number;
  content: Card[];
};

export type GetCardList = {
  searchValue?: string;
  cardType?: CardType;
  page: number;
  size: number;
};

export type GetExerciseList = {
  searchValue?: string;
  exerciseType?: ExerciseType;
  page: number;
  size: number;
};

export type GetCard = Card & {
  htmlContent: string;
  description: string;
  exercises: any[]; // TODO fix any
};

type Exercise = {
  id: string;
  name: string;
  type?: 'all' | 'favourite';
};
export type ExerciseList = {
  totalCount: number;
  content: Exercise[];
};
