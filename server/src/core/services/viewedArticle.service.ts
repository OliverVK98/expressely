import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ViewedArticle } from '../entities/viewedArticle.entity';
import { User } from '../entities/user.entity';
import { Article } from '../entities/article.entity';
import { generateFakeAnalyticsData } from '../lib/generateFakeAnalytics';
import { calculateCountsByMonth } from '../lib/createCounts';

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

  async getViewedArticleCountsByMonth(year: number) {
    if (year === 2022) {
      return generateFakeAnalyticsData(2022);
    }

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const viewedArticles = await this.repo.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });

    return calculateCountsByMonth({
      countEntity: viewedArticles,
      year,
      mockedData: generateFakeAnalyticsData(2023),
    });
  }
}
