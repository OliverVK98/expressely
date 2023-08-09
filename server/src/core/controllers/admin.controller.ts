import {
  Body,
  Controller,
  Get,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { ArticleSerializer } from '../serializers/article/article.serializer';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { CommentService } from '../services/comment.service';
import { AccessTokenGuard } from '../guards';
import { ApproveArticleDto } from '../dtos/article/approveArticle.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';

@Controller('admin')
export class AdminController {
  constructor(
    private articleSerializer: ArticleSerializer,
    private articleService: ArticleService,
    private userService: UserService,
    private notificationService: NotificationService,
    private commentService: CommentService,
  ) {}
  @UseGuards(AccessTokenGuard)
  @Get('/get-pending-articles')
  async getAdminArticles(@CurrentUser('userId') userId: number) {
    const isAdmin = await this.userService.isUserAdmin(userId);
    if (!isAdmin) {
      throw new UnauthorizedException();
    }
    const articles = await this.articleService.getAdminArticles();
    return this.articleSerializer.serializeMany(articles, 'user');
  }
  @UseGuards(AccessTokenGuard)
  @Patch('/approve-article')
  async approveArticle(
    @Body() { articleId }: ApproveArticleDto,
    @CurrentUser('userId') userId: number,
  ) {
    const isAdmin = await this.userService.isUserAdmin(userId);
    // Refactor to a GUARD
    if (!isAdmin) {
      throw new UnauthorizedException();
    }
    const article = await this.articleService.approveArticle(articleId);
    return this.articleSerializer.serialize(article, 'user');
  }

  @UseGuards(AccessTokenGuard)
  @Get('/analytics/articles')
  async getArticlesAnalytics() {
    return {
      January: 10,
      February: 15,
      March: 20,
      April: 12,
      May: 18,
      June: 14,
      July: 22,
      August: 19,
      September: 13,
      October: 17,
      November: 11,
      December: 16,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Get('/analytics/views')
  async getViewsAnalytics() {}

  @UseGuards(AccessTokenGuard)
  @Get('/analytics/users')
  async getUsersAnalytics() {}
}
