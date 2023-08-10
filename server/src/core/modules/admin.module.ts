import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Article } from '../entities/article.entity';
import { Notification } from '../entities/notification.entity';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';
import { ArticleService } from '../services/article.service';
import { NotificationService } from '../services/notification.service';
import { Comment } from '../entities/comment.entity';
import { AdminController } from '../controllers/admin.controller';
import { ArticleSerializer } from '../serializers/article/article.serializer';
import { ViewedArticle } from '../entities/viewedArticle.entity';
import { ViewedArticleService } from '../services/viewedArticle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      User,
      Article,
      Notification,
      ViewedArticle,
    ]),
  ],
  controllers: [AdminController],
  providers: [
    CommentService,
    UserService,
    ArticleService,
    NotificationService,
    ArticleSerializer,
    ViewedArticleService,
  ],
})
export class AdminModule {}
