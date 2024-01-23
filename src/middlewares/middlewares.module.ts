import { Module } from '@nestjs/common';

import { TokenService } from '@common/token/token.service';

import { RequestService } from '../request.service';

import { AuthenticationMiddleware } from './authentication.middleware';
import { CategoryMiddleware } from './category.middleware';

@Module({
  providers: [
    TokenService,
    AuthenticationMiddleware,
    CategoryMiddleware,
    RequestService,
  ],
  exports: [AuthenticationMiddleware, CategoryMiddleware],
})
export class MiddlewaresModule {}
