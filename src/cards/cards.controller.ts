import { Response } from 'express';
import { Controller, Get, Param, Query, Res } from '@nestjs/common';

import { CardsService } from './cards.service';
import { GetCardList } from './types';

@Controller('cards')
export class CardsController {
  constructor(readonly cardsService: CardsService) {}
  @Get()
  async getCardList(@Query() query: GetCardList, @Res() res: Response) {
    const cardsData = await this.cardsService.getCardList(query);

    res.send(cardsData);
  }
  @Get(':cardId')
  async getCard(@Param('cardId') cardId: string, @Res() res: Response) {
    const cardData = await this.cardsService.getCard(cardId);
    res.send(cardData);
  }
  @Get(':cardId/exercises/:exerciseId')
  async getCardExercise(
    @Param('exerciseId') exerciseId: string,
    @Res() res: Response,
  ) {
    const exercise = await this.cardsService.getCardExercise(exerciseId);
    res.send(exercise);
  }
}
