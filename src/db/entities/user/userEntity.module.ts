import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserEntityService } from './userEntity.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserEntityService],
  exports: [UserEntityService],
})
export class UserEntityModule {}
