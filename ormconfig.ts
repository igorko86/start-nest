import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: 'postgresql://postgres:postgres@localhost:5432/portal',
  entities: [`src/db/entities/**/*{.js,.ts}`],
  migrations: [`src/db/migrations/**/*{.js,.ts}`],
  migrationsTableName: 'migrations',
  synchronize: false,
  // ssl: {
  //   rejectUnauthorized: false, // Necessary in some cases, depending on your SSL setup
  // },
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //     sslmode: 'require',
  //   },
  // },
});
