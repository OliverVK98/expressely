import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ViewedArticle } from '../entities/viewedArticle.entity';
import { User } from '../entities/user.entity';
import { Article } from '../entities/article.entity';

@Injectable()
export class ViewedArticleService {
  constructor(
    @InjectRepository(ViewedArticle) private repo: Repository<ViewedArticle>,
  ) {}
  async create(user: User, article: Article) {
    return this.repo.create({
      user,
      article,
      timestamp: new Date(),
    });
  }

  async save(viewedArticle: ViewedArticle) {
    return await this.repo.save(viewedArticle);
  }

  async findOne(userId: number, articleId: number) {
    return await this.repo
      .createQueryBuilder('viewedArticle')
      .where('viewedArticle.user.id = :userId', { userId })
      .andWhere('viewedArticle.article.id = :articleId', { articleId })
      .getOne();
  }
}
