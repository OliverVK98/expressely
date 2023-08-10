import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { CreateCommentDto } from '../dtos/comment/createComment.dto';
import { calculateCountsByMonth } from '../lib/createCounts';
import { generateFakeAnalyticsData } from '../lib/generateFakeAnalytics';

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

  async getCommentCountsByMonth(year: number) {
    if (year === 2022) {
      return generateFakeAnalyticsData(2022);
    }

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const comments = await this.repo.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });

    return calculateCountsByMonth({
      countEntity: comments,
      year,
      mockedData: generateFakeAnalyticsData(2023),
    });
  }
}
