import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { TokenService } from '@common/token/token.service';
import { TypeormModule } from '@db/typeorm.module';

import { AuthModule } from './auth/auth.module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { CategoryMiddleware } from './middlewares/category.middleware';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config.module';
import { RequestService } from './request.service';

@Module({
  imports: [
    ConfigModule,
    TypeormModule,
    AuthModule,
    UserModule,
    MiddlewaresModule,
  ],
  providers: [RequestService, TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).exclude('cards').forRoutes({
      path: '',
      method: RequestMethod.ALL,
    });
    consumer.apply(CategoryMiddleware).forRoutes({
      path: 'cards',
      method: RequestMethod.ALL,
    });
  }
}
