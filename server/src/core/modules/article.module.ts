import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { ArticleService } from '../services/article.service';
import { ArticleController } from '../controllers/article.controller';
import { ArticleSerializer } from '../serializers/article/article.serializer';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleSerializer, UserService],
})
export class ArticleModule {}
