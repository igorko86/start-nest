import { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';

import { GeneralService } from './general.service';

@Controller()
export class GeneralController {
  constructor(readonly cardsService: GeneralService) {}
  @Get('categories')
  async getCardList(@Res() res: Response) {
    const categories = await this.cardsService.getCategories();

    res.send(categories);
  }
}
