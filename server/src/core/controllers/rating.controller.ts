import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RatingService } from '../services/rating.service';
import { ApiTags } from '@nestjs/swagger';
import { RatingOptionsDto } from '../dtos/rating/ratingOptions.dto';
import { CreateRatingDto } from '../dtos/rating/createRating.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { User } from '../entities/user.entity';
import { ArticleService } from '../services/article.service';
import { Serialize } from '../interceptors/serialize';
import { RatingDto } from '../dtos/rating/rating.dto';

@Controller('article-ratings')
@ApiTags('rating')
export class RatingController {
  constructor(
    private ratingService: RatingService,
    private articleService: ArticleService,
  ) {}
  @Post('/new')
  @Serialize(RatingDto)
  @UseGuards(AuthGuard)
  async createNewArticleRating(
    @Body() body: CreateRatingDto,
    @CurrentUser() user: User,
  ) {
    const article = await this.articleService.findOne(body.articleId);
    return await this.ratingService.createRating(body, user, article);
  }

  @Get()
  @Serialize(RatingDto)
  async getArticleRating(@Query() ratingOptions: RatingOptionsDto) {
    return await this.ratingService.findArticleRating(ratingOptions);
  }
}
