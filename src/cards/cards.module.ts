import { Module } from '@nestjs/common';

import { CardEntityModule } from '@entities/cards/cardEntity.module';

import { RequestService } from '../request.service';

import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [CardEntityModule],
  providers: [CardsService, RequestService],
  controllers: [CardsController],
})
export class CardsModule {}
