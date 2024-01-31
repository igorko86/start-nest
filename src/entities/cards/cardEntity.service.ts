import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RequestService } from '../../request.service';

import { Card } from './card.entity';
import { QueryGetCards } from './types';

@Injectable()
export class CardEntityService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    readonly requestService: RequestService,
  ) {}
  async getCards({
    searchValue,
    tutorId,
    cardType,
    cardIds,
    page = 0,
    size,
  }: QueryGetCards): Promise<[Card[], number]> {
    const query = this.cardRepository
      .createQueryBuilder('card')
      .where('card.categoryCustomId = :categoryCustomId', {
        categoryCustomId: this.requestService.selectedCategory,
      });

    if (tutorId) {
      query.andWhere(
        `((card.tutorId = :tutorId and card.cardType = 'private') or card.cardType = 'public')`,
        {
          tutorId,
        },
      );
    }

    if (cardType) {
      query.andWhere('card.cardType = :cardType', { cardType });
    }

    if (cardIds?.length) {
      query.andWhere('card.id IN (:...cardIds)', { cardIds });
    }

    if (searchValue?.toString()) {
      query.andWhere(
        '(card.name ILIKE :value or card.description ILIKE :value)',
        { value: `%${searchValue}%` },
      );
    }

    return query
      .skip((size ?? 0) * page)
      .take(size)
      .getManyAndCount();
  }

  async getCard(cardId: string): Promise<Card> {
    return await this.cardRepository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.exercisesForCard', 'exercisesForCard')
      .leftJoinAndSelect('exercisesForCard.exercise', 'exercise')
      .where('card.id = :cardId', { cardId })
      .getOne();
  }
}
