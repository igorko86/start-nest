import { BadRequestException, Injectable } from '@nestjs/common';

import { SOMETHING_WENT_WRONG } from '@common/constants/error.constants';
import { CardEntityService } from '@entities/cards/cardEntity.service';
import { ExerciseEntityService } from '@entities/exercise/exerciseEntity.service';

import { CardList, GetCard, GetCardList } from './types';
import { addBucketName } from './utils';

@Injectable()
export class CardsService {
  constructor(
    readonly cardEntityService: CardEntityService,
    readonly exerciseEntityService: ExerciseEntityService,
  ) {}
  async getCardList(params: GetCardList): Promise<CardList> {
    const [cards, totalCount] = await this.cardEntityService.getCards(params);

    return {
      content: cards.map((card) => ({
        id: card.id,
        name: card.name,
        image: addBucketName(card.image),
      })),
      totalCount,
    };
  }

  async getCard(cardId: string): Promise<GetCard> {
    const card = await this.cardEntityService.getCard(cardId);

    const exercises = card.exercisesForCard.map((exrForCard) => {
      return {
        id: exrForCard.exercise.id,
        name: exrForCard.exercise.name,
      };
    });

    return {
      id: card.id,
      name: card.name,
      description: card.description,
      image: addBucketName(card.image),
      htmlContent: card.htmlContent,
      exercises,
    };
  }

  async getCardExercise(exerciseId: string) {
    const exercise = await this.exerciseEntityService.getExercise(exerciseId);
    if (!exercise) {
      throw new BadRequestException(SOMETHING_WENT_WRONG);
    }

    return {
      id: exercise.id,
      questions: exercise.questions,
      name: exercise.name,
    };
  }
}
