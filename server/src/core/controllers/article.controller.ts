import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dtos/article/createArticle.dto';
import { CurrentUser } from '../decorators/currentUser';
import { User } from '../entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize';
import { ArticleDto } from '../dtos/article/article.dto';
import { PageOptionsDto } from '../dtos/page/pageOptions.dto';
import { plainToClass } from 'class-transformer';
import { ArticleExpandedUserDto } from '../dtos/article/articleExpandedUser.dto';

@Controller('articles')
@ApiTags('articles')
export class ArticleController {
  constructor(private articlesService: ArticleService) {}

  @Get('/:id')
  @Serialize(ArticleDto)
  async getArticle(@Param('id') id: string) {
    const article = await this.articlesService.findOne(+id);
    return article;
  }

  // @Get()
  // async getArticles(
  //   @Query('sort') sort: ArticleSortType,
  //   @Query('order') order: ArticleOrderType,
  //   @Query('search') search: string,
  //   @Query('type') type: ArticleType,
  // ) {
  //   return await this.articlesService.findMany(sort, order, search, type);
  // }

  @Get()
  async getNewArticles(@Query() pageOptions: PageOptionsDto) {
    const entities = await this.articlesService.getArticles(pageOptions);
    let serializedData;

    if (pageOptions.expand === 'user') {
      serializedData = entities.data.map((article) =>
        plainToClass(ArticleExpandedUserDto, article, {
          excludeExtraneousValues: true,
        }),
      );
    } else {
      serializedData = entities.data.map((article) =>
        plainToClass(ArticleDto, article, { excludeExtraneousValues: true }),
      );
    }

    return {
      data: serializedData,
      meta: entities.meta,
    };
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  @Serialize(ArticleDto)
  async saveArticle(@Body() body: CreateArticleDto, @CurrentUser() user: User) {
    return await this.articlesService.create(body, user);
  }
}
