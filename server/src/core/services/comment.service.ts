import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { CreateCommentDto } from '../dtos/comment/createComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}
  async createComment(comment: CreateCommentDto, article: Article, user: User) {
    const newComment = await this.repo.create(comment);
    newComment.user = user;
    newComment.article = article;

    return await this.repo.save(newComment);
  }

  async getCommentsByArticleId(articleId: number) {
    return await this.repo
      .createQueryBuilder('comment')
      .where('comment.articleId = :articleId', { articleId })
      .leftJoinAndSelect('comment.user', 'user')
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }
}
