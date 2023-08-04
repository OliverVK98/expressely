import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { ArticleService } from '../services/article.service';
import { ArticleController } from '../controllers/article.controller';
import { ArticleSerializer } from '../serializers/article/article.serializer';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../entities/notification.entity';
import { ViewedArticle } from '../entities/viewedArticle.entity';
import { ViewedArticleService } from '../services/viewedArticle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User, Notification, ViewedArticle]),
  ],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticleSerializer,
    UserService,
    NotificationService,
    ViewedArticleService,
  ],
})
export class ArticleModule {}
