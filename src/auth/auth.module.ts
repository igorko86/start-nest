import { Module } from '@nestjs/common';

import { MailService } from '@common/mail/mail.service';
import { TokenService } from '@common/token/token.service';
import { TokenEntityModule } from '@db/entities/token/tokenEntity.module';
import { UserEntityModule } from '@db/entities/user/userEntity.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TokenEntityModule, UserEntityModule],
  providers: [AuthService, MailService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
