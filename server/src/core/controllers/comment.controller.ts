import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { AccessTokenGuard } from '../guards';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { UserService } from '../services/user.service';
import { ArticleService } from '../services/article.service';
import { CreateCommentDto } from '../dtos/comment/createComment.dto';
import { GetCommentDto } from '../dtos/comment/getComment.dto';
import { CommentSerializer } from '../serializers/comment/comment.serializer';

@Controller('comments')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private articleService: ArticleService,
    private commentSerializer: CommentSerializer,
  ) {}

  @Get()
  async getCommentsByArticleId(@Query() { articleId }: GetCommentDto) {
    const comments = await this.commentService.getCommentsByArticleId(
      articleId,
    );

    return this.commentSerializer.serializeMany(comments);
  }

  @Post('/create')
  @UseGuards(AccessTokenGuard)
  async createComment(
    @CurrentUser('userId') userId: number,
    @Query() { articleId }: GetCommentDto,
    @Body() body: CreateCommentDto,
  ) {
    const user = await this.userService.findOneById(userId);
    const article = await this.articleService.findOne(articleId);
    const comment = await this.commentService.createComment(
      body,
      article,
      user,
    );

    return this.commentSerializer.serialize(comment);
  }
}
