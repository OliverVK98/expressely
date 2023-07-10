import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Article,
  ArticleModule,
  Comment,
  CommentModule,
  Notification,
  NotificationModule,
  Profile,
  ProfileModule,
  Rating,
  RatingModule,
  User,
  UserModule,
} from './core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-winter-shadow-942537.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'OliverVK98',
      password: 'A6Hh2oabJwxz',
      database: 'main_db',
      entities: [Article, User, Notification, Comment, Profile, Rating],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ArticleModule,
    UserModule,
    NotificationModule,
    CommentModule,
    ProfileModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'your-secret-key',
          resave: false,
          saveUninitialized: true,
        }),
      )
      .forRoutes('*');
  }
}
