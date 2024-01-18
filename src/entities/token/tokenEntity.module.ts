import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Token } from './token.entity';
import { TokenEntityService } from './tokenEntity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenEntityService],
  exports: [TokenEntityService],
})
export class TokenEntityModule {}
