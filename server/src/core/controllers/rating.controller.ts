import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RatingService } from '../services/rating.service';
import { RatingOptionsDto } from '../dtos/rating/ratingOptions.dto';
import { CreateRatingDto } from '../dtos/rating/createRating.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { ArticleService } from '../services/article.service';
import { Serialize } from '../interceptors/serialize';
import { RatingDto } from '../dtos/rating/rating.dto';
import { AccessTokenGuard } from '../guards';
import { UserService } from '../services/user.service';

@Controller('article-ratings')
export class RatingController {
  constructor(
    private ratingService: RatingService,
    private articleService: ArticleService,
    private userService: UserService,
  ) {}
  @Post('/new')
  @Serialize(RatingDto)
  @UseGuards(AccessTokenGuard)
  async createNewArticleRating(
    @Body() body: CreateRatingDto,
    @CurrentUser('userId') userId,
  ) {
    const article = await this.articleService.findOne(body.articleId, true);
    const user = await this.userService.findOneById(userId);
    return await this.ratingService.createRating(body, user, article);
  }

  @Get()
  @Serialize(RatingDto)
  async getArticleRating(@Query() ratingOptions: RatingOptionsDto) {
    return await this.ratingService.findArticleRating(ratingOptions);
  }
}
