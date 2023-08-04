import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewedArticle } from '../entities/viewedArticle.entity';
import { ViewedArticleService } from '../services/viewedArticle.service';

@Module({
  imports: [TypeOrmModule.forFeature([ViewedArticle])],
  controllers: [],
  providers: [ViewedArticleService],
  exports: [ViewedArticleService],
})
export class ViewedArticleModule {}
