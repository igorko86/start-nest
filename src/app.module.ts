import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenService } from '@common/token/token.service';

import { AuthModule } from './auth/auth.module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { CategoryMiddleware } from './middlewares/category.middleware';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { UserModule } from './user/user.module';
import { RequestService } from './request.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/entities/**/*.entity.js'],
      migrations: ['dist/db/migrations/**/*.js'],
      migrationsTableName: 'migrations',
      // cli: { migrationsDir: 'src/db/migrations' },
    }),
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
