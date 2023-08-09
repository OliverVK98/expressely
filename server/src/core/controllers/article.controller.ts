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
import { GetUserArticleDto } from '../dtos/article/getUserArticle.dto';

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
  async getArticles(@Query() pageOptions: PageOptionsDto) {
    const entities = await this.articleService.getArticles(pageOptions, true);
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
    await this.notificationService.createNotification(
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
    const article = await this.articleService.findOne(articleId, true);

    await this.userService.updateUserHistory(
      userId,
      article,
      this.viewedArticleService,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('/history')
  async getUserHistory(@CurrentUser('userId') userId: number) {
    const articles = await this.userService.getUserHistory(userId);

    return this.articleSerializer.serializeMany(articles, 'user');
  }

  @UseGuards(AccessTokenGuard)
  @Get('/custom-feed')
  async getCustomFeed(@CurrentUser('userId') userId: number) {
    const customFeed = await this.userService.getCustomFeed(
      userId,
      this.articleService,
    );
    return this.articleSerializer.serializeMany(customFeed, 'user');
  }

  @UseGuards(AccessTokenGuard)
  @Get('/user')
  async getUserSelfApprovedArticles(@CurrentUser('userId') userId: number) {
    const articles = await this.articleService.getUserArticles(userId);
    return this.articleSerializer.serializeMany(articles, 'user');
  }

  @UseGuards(AccessTokenGuard)
  @Get('/user/pending')
  async getUserSelfArticles(@CurrentUser('userId') userId: number) {
    const articles = await this.articleService.getUserPendingArticles(userId);
    return this.articleSerializer.serializeMany(articles, 'user');
  }
  @Get('/user/:id')
  async getUserArticle(@Param() { id }: GetUserArticleDto) {
    const articles = await this.articleService.getUserArticles(id, true);
    return this.articleSerializer.serializeMany(articles, 'user');
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('/view-increment/:id')
  async incrementViewCounter(@Param() { id }: ArticleIncrementViewDto) {
    await this.articleService.incrementViewCounter(id);
  }

  @Get('/:id')
  async getArticle(@Param('id') id: string, @Query('expand') expand: string) {
    const article = await this.articleService.findOne(+id, true);
    return this.articleSerializer.serialize(article, expand);
  }
}
