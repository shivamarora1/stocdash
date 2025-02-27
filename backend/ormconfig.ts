import { DataSource } from 'typeorm';
import 'dotenv/config';

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER_NAME,
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DB_NAME,
  ssl: Boolean(process.env.POSTGRES_SSL),
  migrations: [__dirname + '/migrations/*'],
});
