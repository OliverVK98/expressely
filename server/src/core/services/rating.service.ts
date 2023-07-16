import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { RatingOptionsDto } from '../dtos/rating/ratingOptions.dto';
import { User } from '../entities/user.entity';
import { CreateRatingDto } from '../dtos/rating/createRating.dto';
import { Article } from '../entities/article.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private repo: Repository<Rating>,
  ) {}

  createRating(rating: CreateRatingDto, user: User, article: Article) {
    const newRating = this.repo.create(rating);
    newRating.user = user;
    newRating.article = article;
    return this.repo.save(newRating);
  }

  async findArticleRating({ articleId, userId }: RatingOptionsDto) {
    return await this.repo
      .createQueryBuilder('rating')
      .leftJoinAndSelect('rating.user', 'user')
      .leftJoinAndSelect('rating.article', 'article')
      .where('user.id = :userId', { userId })
      .andWhere('article.id = :articleId', { articleId })
      .getOne();
  }
}
