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

@Module({
  imports: [TypeOrmModule.forFeature([Article, User, Notification])],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    ArticleSerializer,
    UserService,
    NotificationService,
  ],
})
export class ArticleModule {}
