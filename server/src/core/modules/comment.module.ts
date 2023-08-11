import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { User } from '../entities/user.entity';
import { Article } from '../entities/article.entity';
import { UserService } from '../services/user.service';
import { ArticleService } from '../services/article.service';
import { CommentSerializer } from '../serializers/comment/comment.serializer';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Article, Notification])],
  controllers: [CommentController],
  providers: [
    CommentService,
    UserService,
    ArticleService,
    NotificationService,
    CommentSerializer,
  ],
})
export class CommentModule {}
