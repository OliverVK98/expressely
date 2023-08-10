import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { ArticleSerializer } from '../serializers/article/article.serializer';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { CommentService } from '../services/comment.service';
import { AccessTokenGuard, AdminGuard } from '../guards';
import { ApproveArticleDto } from '../dtos/article/approveArticle.dto';
import { ViewedArticleService } from '../services/viewedArticle.service';
import { GetAnalyticsDto } from '../dtos/admin/getAnalyticsDto';

@Controller('admin')
@UseGuards(AccessTokenGuard)
@UseGuards(AdminGuard)
export class AdminController {
  constructor(
    private articleSerializer: ArticleSerializer,
    private articleService: ArticleService,
    private userService: UserService,
    private notificationService: NotificationService,
    private commentService: CommentService,
    private viewedArticleService: ViewedArticleService,
  ) {}
  @Get('/get-pending-articles')
  async getAdminArticles() {
    const articles = await this.articleService.getAdminArticles();
    return this.articleSerializer.serializeMany(articles, 'user');
  }

  @Patch('/approve-article')
  async approveArticle(@Body() { articleId }: ApproveArticleDto) {
    const article = await this.articleService.approveArticle(articleId);
    await this.notificationService.createNotification(
      {
        title: `Article "${article.title}" was published`,
        description: `Congratulations! Your article was approved. Click to read it.`,
        href: `/articles/${article.id}`,
      },
      article.user,
    );
    return this.articleSerializer.serialize(article, 'user');
  }

  @Get('/analytics/articles/:year')
  async getArticlesAnalytics(@Param() { year }: GetAnalyticsDto) {
    return await this.articleService.getArticleCountsByMonth(year);
  }

  @Get('/analytics/views/:year')
  async getViewsAnalytics(@Param() { year }: GetAnalyticsDto) {
    return await this.viewedArticleService.getViewedArticleCountsByMonth(year);
  }

  @Get('/analytics/users/:year')
  async getUsersAnalytics(@Param() { year }: GetAnalyticsDto) {
    return await this.userService.getUserCountsByMonth(year);
  }

  @Get('/analytics/comments/:year')
  async getCommentsAnalytics(@Param() { year }: GetAnalyticsDto) {
    return await this.commentService.getCommentCountsByMonth(year);
  }
}
