import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { ArticleService } from '../services/article.service';
import { ArticleController } from '../controllers/article.controller';
import { ArticleSerializer } from '../serializers/article/article.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleSerializer],
})
export class ArticleModule {}
