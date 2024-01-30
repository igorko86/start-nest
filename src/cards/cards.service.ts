import { Injectable } from '@nestjs/common';

import { CardEntityService } from '@entities/cards/cardEntity.service';

import { RequestService } from '../request.service';

import { CardList, GetCardList } from './types';
import { addBucketName } from './utils';

@Injectable()
export class CardsService {
  constructor(
    readonly cardEntityService: CardEntityService,
    readonly requestService: RequestService,
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
}
