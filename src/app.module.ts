import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TokenService } from '@common/token/token.service';
import { TypeormModule } from '@db/typeorm.module';

import { AuthModule } from './auth/auth.module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { ConfigModule } from './config.module';
import { RequestService } from './request.service';

@Module({
  imports: [ConfigModule, TypeormModule, AuthModule],
  providers: [RequestService, TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude('auth/(.*)')
      .forRoutes('*');
  }
}
