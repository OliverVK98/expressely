import { Module, ValidationPipe } from '@nestjs/common';
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
  Token,
  AuthModule,
  User,
  UserModule,
  ViewedArticle,
  ViewedArticleModule,
  AdminModule,
} from './core';
import { APP_PIPE } from '@nestjs/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [
        Article,
        User,
        Notification,
        Comment,
        Profile,
        Rating,
        Token,
        ViewedArticle,
      ],
      synchronize: false,
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
    AuthModule,
    ViewedArticleModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
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
