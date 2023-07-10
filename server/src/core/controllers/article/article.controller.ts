import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleService } from '../../services/article/article.service';
import { CreateArticleDto } from '../../entities/article/dtos/createArticle.dto';
import { CurrentUser } from '../../decorators/currentUser/currentUser';
import { User } from '../../entities/user/user';

@Controller('article')
export class ArticleController {
  constructor(private articlesService: ArticleService) {}

  @Get()
  async getArticle(@Param('id') id: string) {
    const article = await this.articlesService.findOne(4);
    return article;
  }

  @Post('/create')
  async saveArticle(@Body() body: CreateArticleDto, @CurrentUser() user: User) {
    return await this.articlesService.create(body, user);
  }
}
