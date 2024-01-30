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
  @Get(':id')
  async getCard(@Param('id') id: string, @Res() res: Response) {
    res.send({
      id: 2,
    });
  }
  @Get(':id/exercises/:exerciseId')
  async getCardExercise(@Param() params: any, @Res() res: Response) {
    res.send({
      id: 2,
    });
  }
}
