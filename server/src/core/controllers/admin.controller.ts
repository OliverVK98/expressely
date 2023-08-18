import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { ArticleSerializer } from '../serializers/article/article.serializer';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { CommentService } from '../services/comment.service';
import { AccessTokenGuard, AdminGuard } from '../guards';
import { ApproveArticleDto } from '../dtos/admin/approveArticle.dto';
import { ViewedArticleService } from '../services/viewedArticle.service';
import { GetAnalyticsDto } from '../dtos/admin/getAnalyticsDto';
import { DeleteCommentDto } from '../dtos/admin/deleteComment.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { UserSerializer } from '../serializers/user/user.serializer';
import { UpdateUserRoleDto } from '../dtos/admin/updateUserRole.dto';
import { GetNotApprovedArticleDto } from '../dtos/admin/getNotApprovedArticle.dto';

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
    private userSerializer: UserSerializer,
  ) {}

  @Get('/get-pending-articles')
  async getAdminArticles() {
    const articles = await this.articleService.getAdminArticles();
    return this.articleSerializer.serializeMany(articles, 'user');
  }

  @Get('/get-pending-article/:articleId')
  async getAdminArticleWithId(
    @Param() { articleId }: GetNotApprovedArticleDto,
  ) {
    const article = await this.articleService.findOneWithApprovalStatus(
      articleId,
      false,
    );
    return this.articleSerializer.serialize(article, 'user');
  }

  @Get('/userlist')
  async getAdminUserList(@CurrentUser('userId') userId: number) {
    const userList = await this.userService.getAdminUserList(userId);
    return this.userSerializer.serializeAuthMany(userList);
  }

  @Patch('/update-user-role')
  async updateUserRole(@Body() { userId, role }: UpdateUserRoleDto) {
    const updatedUser = await this.userService.updateUserRole(userId, role);
    return this.userSerializer.serializeAuth(updatedUser);
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

  @Delete('/delete-comment')
  async deleteUserComment(@Body() { commentId }: DeleteCommentDto) {
    return await this.commentService.deleteCommentWithId(commentId);
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
