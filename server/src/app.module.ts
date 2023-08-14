import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../..', 'client', 'build'),
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
export class AppModule {}
