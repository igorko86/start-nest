import { Module } from '@nestjs/common';

import { CardEntityModule } from '@db/entities/cards/cardEntity.module';
import { ExerciseEntityModule } from '@db/entities/exercise/exerciseEntity.module';

import { RequestService } from '../request.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CardEntityModule, ExerciseEntityModule],
  providers: [UserService, RequestService],
  controllers: [UserController],
})
export class UserModule {}
