import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.API_HOST || 'localhost',
  port: Number.parseInt(process.env.PORT_DB) || 5432,
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || '12345',
  database: process.env.POSTGRES_DB || 'db',
  entities: ['dist/**/*.entity.js'],
  logging: true,
  synchronize: false,
  migrationsRun: true,
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'history',
});
