import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../../services/article/article.service';
import { CreateArticleDto } from '../../entities/article/dtos/createArticle.dto';
import { CurrentUser } from '../../decorators/currentUser/currentUser';
import { User } from '../../entities/user/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { Serialize } from '../../interceptors/serialize';
import { ArticleDto } from '../../entities/article/dtos/article.dto';
import {
  ArticleOrderType,
  ArticleSortType,
  ArticleType,
} from '../../types/article/article';

@Controller('articles')
@ApiTags('articles')
export class ArticleController {
  constructor(private articlesService: ArticleService) {}

  @Get('/:id')
  async getArticle(@Param('id') id: string) {
    const article = await this.articlesService.findOne(4);
    return article;
  }

  @Get()
  async getArticles(
    @Query('sort') sort: ArticleSortType,
    @Query('order') order: ArticleOrderType,
    @Query('search') search: string,
    @Query('type') type: ArticleType,
  ) {
    return await this.articlesService.findMany(sort, order, search, type);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  @Serialize(ArticleDto)
  async saveArticle(@Body() body: CreateArticleDto, @CurrentUser() user: User) {
    return await this.articlesService.create(body, user);
  }
}
