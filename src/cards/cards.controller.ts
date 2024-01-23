import { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';

@Controller('cards')
export class CardsController {
  @Get()
  async getCardList(@Res() res: Response) {
    res.send({
      id: 2,
    });
  }
}
