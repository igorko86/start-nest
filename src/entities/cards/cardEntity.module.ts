import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Card } from './card.entity';
import { CardEntityService } from './cardEntity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardEntityService],
  exports: [CardEntityService],
})
export class CardEntityModule {}
