import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { RatingController } from '../controllers/rating.controller';
import { RatingService } from '../services/rating.service';
import { ArticleService } from '../services/article.service';
import { Article } from '../entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Article])],
  controllers: [RatingController],
  providers: [RatingService, ArticleService],
})
export class RatingModule {}
