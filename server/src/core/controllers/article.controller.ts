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
import { UpdateUserHistoryDto } from '../dtos/user/updateUserHistory.dto';
import { ViewedArticleService } from '../services/viewedArticle.service';

@Controller('articles')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private articleSerializer: ArticleSerializer,
    private userService: UserService,
    private notificationService: NotificationService,
    private viewedArticleService: ViewedArticleService,
  ) {}

  @Get()
  async getMostReading(@Query() pageOptions: PageOptionsDto) {
    const entities = await this.articleService.getArticles(pageOptions);
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
    const article = await this.articleService.create(body, user);
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
    return await this.articleService.updateArticle(body, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/history')
  async updateUserHistory(
    @CurrentUser('userId') userId: number,
    @Body() { articleId }: UpdateUserHistoryDto,
  ) {
    const article = await this.articleService.findOne(articleId);

    this.userService.updateUserHistory(
      userId,
      article,
      this.viewedArticleService,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('/history')
  async getUserHistory(@CurrentUser('userId') userId: number) {
    return await this.userService.getUserHistory(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/custom-feed')
  async getCustomFeed(@CurrentUser('userId') userId: number) {
    return await this.userService.getUserHistory(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('/view-increment/:id')
  incrementViewCounter(@Param() { id }: ArticleIncrementViewDto) {
    this.articleService.incrementViewCounter(id);
  }

  @Get('/:id')
  async getArticle(@Param('id') id: string, @Query('expand') expand: string) {
    const article = await this.articleService.findOne(+id);
    return this.articleSerializer.serialize(article, expand);
  }
}
