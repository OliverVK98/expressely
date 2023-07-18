import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { RatingController } from '../controllers/rating.controller';
import { RatingService } from '../services/rating.service';
import { ArticleService } from '../services/article.service';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Article, User])],
  controllers: [RatingController],
  providers: [RatingService, ArticleService, UserService],
})
export class RatingModule {}
