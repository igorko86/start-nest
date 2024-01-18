import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log(process.env.POSTGRES_PASSWORD);
// TODO move variables to env file
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'portal',
      entities: ['dist/entities/**/*.entity.js'],
      // migrations: ['dist/db/migrations/**/*.js'],
      synchronize: true,
      // cli: { migrationsDir: 'src/db/migrations' },
    }),
  ],
})
export class TypeormModule {}
