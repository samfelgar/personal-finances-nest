import { registerAs } from '@nestjs/config';

type DatabaseType = 'mariadb' | 'mysql';

export interface DatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    type: process.env.DB_CONNECTION as DatabaseType,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.APP_ENV !== 'production',
  }),
);
