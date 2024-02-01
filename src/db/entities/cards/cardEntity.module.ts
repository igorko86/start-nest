import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestService } from '../../../request.service';

import { Card } from './card.entity';
import { CardEntityService } from './cardEntity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardEntityService, RequestService],
  exports: [CardEntityService],
})
export class CardEntityModule {}
