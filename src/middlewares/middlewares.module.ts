import { Module } from '@nestjs/common';

import { AuthenticationMiddleware } from './authentication.middleware';

@Module({
  providers: [AuthenticationMiddleware],
})
export class MiddlewaresModule {}
