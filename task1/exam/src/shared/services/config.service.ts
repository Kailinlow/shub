import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv;

    if (nodeEnv === 'development') {
      dotenv.config({
        path: `.env`,
      });
    }

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get logLevel(): string {
    return this.get('LOG_LEVEL') ?? 'info';
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/***/**/*.entity{.ts,.js}',
      __dirname + '/../../common/**/*.entity{.ts,.js}',
      __dirname + '/../../shared/**/*.entity{.ts,.js}',
    ];
    let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    if ((<any>module).hot) {
      const entityContext = (<any>require).context(
        './../../modules',
        true,
        /\.entity\.ts$/,
      );
      entities = entityContext.keys().map((id) => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity;
      });
      const migrationContext = (<any>require).context(
        './../../migrations',
        false,
        /\.ts$/,
      );
      migrations = migrationContext.keys().map((id) => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration;
      });
    }
    return {
      extra: {
        max: this.get('POSTGRES_MAX_CONNECTIONS') || 70, // Maximum number of connections in the pool
        idleTimeoutMillis: this.get('POSTGRES_IDLE_TIMEOUT_MILLIS') || 30000, // Close idle connections after ... seconds
      },
      entities,
      migrations,
      keepConnectionAlive: false,
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: this.getNumber('POSTGRES_PORT'),
      username: this.get('POSTGRES_USERNAME'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),
      migrationsRun: false,
      logging: ['error'], // false, // true, // this.nodeEnv === 'development',
      //   logging: true,
    };
  }

  get awsS3Config() {
    const s3BucketName = this.get('S3_BUCKET');
    const s3PublicBucketName = this.get('S3_PUBLIC_BUCKET');
    const s3AccessKey = this.get('S3_ACCESS_KEY');
    const s3SecretAccessKey = this.get('S3_SECRET_ACCESS_KEY');
    const s3PostExpired = Number(this.get('S3_POST_OBJECT_EXPIRED_TIME')) || 30;
    const s3GetExpired = Number(this.get('S3_GET_OBJECT_EXPIRED_TIME')) || 15;
    const s3PublicBucketAccessKey = this.get('S3_PUBLIC_BUCKET_ACCESS_KEY');
    const s3PublicBucketSecretAccessKey = this.get(
      'S3_PUBLIC_BUCKET_SECRET_ACCESS_KEY',
    );
    const s3Region = this.get('S3_REGION');
    return {
      s3BucketName,
      s3PublicBucketName,
      s3AccessKey,
      s3SecretAccessKey,
      s3PublicBucketAccessKey,
      s3PublicBucketSecretAccessKey,
      s3PostExpired,
      s3GetExpired,
      s3Region,
    };
  }
}
