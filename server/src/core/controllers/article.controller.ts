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
import { CurrentUser } from '../decorators/currentUser.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize';
import { ArticleDto } from '../dtos/article/article.dto';
import { PageOptionsDto } from '../dtos/page/pageOptions.dto';
import { ArticleSerializer } from '../serializers/article/article.serializer';
import { AccessTokenGuard } from '../guards';
import { UserService } from '../services/user.service';

@Controller('articles')
@ApiTags('articles')
export class ArticleController {
  constructor(
    private articlesService: ArticleService,
    private articleSerializer: ArticleSerializer,
    private userService: UserService,
  ) {}

  @Get('/:id')
  async getArticle(@Param('id') id: string, @Query('expand') expand: string) {
    const article = await this.articlesService.findOne(+id);
    return this.articleSerializer.serialize(article, expand);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  async getNewArticles(@Query() pageOptions: PageOptionsDto) {
    const entities = await this.articlesService.getArticles(pageOptions);
    const serializedData = this.articleSerializer.serializeMany(
      entities.data,
      pageOptions.expand,
    );
    return {
      data: serializedData,
      meta: entities.meta,
    };
  }

  @Post('/create')
  @UseGuards(AccessTokenGuard)
  @Serialize(ArticleDto)
  async saveArticle(
    @Body() body: CreateArticleDto,
    @CurrentUser('userId') userId: number,
  ) {
    const user = await this.userService.findOneById(userId);
    return await this.articlesService.create(body, user);
  }
}
