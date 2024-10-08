import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Film } from './src/movies/entities/film.entity';
import { Character } from './src/movies/entities/character.entity';
import { config } from 'dotenv';

config();

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: isProd ? process.env.DATABASE_URL : undefined,
  host: !isProd ? process.env.DB_HOST : undefined,
  port: !isProd ? +process.env.DB_PORT : undefined,
  username: !isProd ? process.env.DB_USERNAME : undefined,
  password: !isProd ? process.env.DB_PASSWORD : undefined,
  database: !isProd ? process.env.DB_NAME : undefined,
  ssl: isProd ? { rejectUnauthorized: false } : false,
  entities: [User, Film, Character],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  migrationsRun: isProd,
  logging: !isProd,
});
