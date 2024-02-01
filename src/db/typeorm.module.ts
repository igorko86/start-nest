import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD.toString(),
      database: process.env.DB_NAME,
      entities: ['dist/entities/**/*.entity.js'],
      migrations: ['dist/db/migrations/**/*.js'],
      migrationsTableName: 'migrations',
      // cli: { migrationsDir: 'src/db/migrations' },
    }),
  ],
})
export class TypeormModule {}
