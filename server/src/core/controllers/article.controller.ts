import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dtos/article/createArticle.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { Serialize } from '../interceptors/serialize';
import { ArticleDto } from '../dtos/article/article.dto';
import { PageOptionsDto } from '../dtos/page/pageOptions.dto';
import { ArticleSerializer } from '../serializers/article/article.serializer';
import { AccessTokenGuard } from '../guards';
import { UserService } from '../services/user.service';
import { UpdateArticleDto } from '../dtos/article/updateArticle.dto';
import { NotificationService } from '../services/notification.service';
import { ArticleIncrementViewDto } from '../dtos/article/articleIncrementView.dto';

@Controller('articles')
export class ArticleController {
  constructor(
    private articlesService: ArticleService,
    private articleSerializer: ArticleSerializer,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {}

  @Get('/:id')
  async getArticle(@Param('id') id: string, @Query('expand') expand: string) {
    const article = await this.articlesService.findOne(+id);
    return this.articleSerializer.serialize(article, expand);
  }

  @Get()
  async getArticles(@Query() pageOptions: PageOptionsDto) {
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
    const article = await this.articlesService.create(body, user);
    this.notificationService.createNotification(
      {
        title: `New Article Published`,
        description: `Article: ${article.title} was successfully created`,
        href: `/articles/${article.id}`,
      },
      user,
    );
    return article;
  }

  @Patch('/update')
  @UseGuards(AccessTokenGuard)
  @Serialize(ArticleDto)
  async updateArticle(
    @Body() body: UpdateArticleDto,
    @CurrentUser('userId') userId: number,
  ) {
    return await this.articlesService.updateArticle(body, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('/view-increment/:id')
  incrementViewCounter(@Param() { id }: ArticleIncrementViewDto) {
    this.articlesService.incrementViewCounter(id);
  }
}
