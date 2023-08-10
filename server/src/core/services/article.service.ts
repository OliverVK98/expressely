import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dtos/article/createArticle.dto';
import { User } from '../entities/user.entity';
import { PageOptionsDto } from '../dtos/page/pageOptions.dto';
import { PageMetaDto } from '../dtos/page/pageMeta.dto';
import { PageDto } from '../dtos/page/page.dto';
import { UpdateArticleDto } from '../dtos/article/updateArticle.dto';
import { ArticleType } from '../types/article';
import { calculateCountsByMonth } from '../lib/createCounts';
import { generateFakeAnalyticsData } from '../lib/generateFakeAnalytics';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private repo: Repository<Article>) {}

  shuffleArray(array: Article[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async create(newArticle: CreateArticleDto, user: User) {
    newArticle.type = [...new Set(newArticle.type)];
    const article = this.repo.create({ ...newArticle, approved: false });
    article.user = user;

    return await this.repo.save(article);
  }

  async findOne(id: number, approved: boolean) {
    return await this.repo
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .andWhere('article.approved = :approved', { approved })
      .leftJoinAndSelect('article.user', 'user')
      .getOne();
  }

  async approveArticle(id: number) {
    const article = await this.repo
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .andWhere('article.approved = :approved', { approved: false })
      .leftJoinAndSelect('article.user', 'user')
      .getOne();

    if (!article) {
      throw new Error('Article not found');
    }

    article.approved = true;
    return await this.repo.save(article);
  }

  getAdminArticles() {
    return this.repo
      .createQueryBuilder('article')
      .where('article.approved = :approved', { approved: false })
      .leftJoinAndSelect('article.user', 'user')
      .getMany();
  }

  async getArticles(pageOptions: PageOptionsDto, approved: boolean) {
    const queryBuilder = this.repo.createQueryBuilder('article');

    queryBuilder
      .leftJoinAndSelect('article.user', 'user')
      .orderBy(
        `article.${pageOptions.sort}`,
        pageOptions.order.toUpperCase() as 'ASC' | 'DESC',
      )
      .skip((pageOptions.page - 1) * pageOptions.limit)
      .take(pageOptions.limit)
      .where(`article.title ILIKE :search`, {
        search: `%${pageOptions.search}%`,
      })
      .andWhere('article.approved = :approved', { approved });

    if (pageOptions.type !== ArticleType.ALL) {
      queryBuilder.andWhere('article.type @> ARRAY[:type]', {
        type: pageOptions.type,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMeta = new PageMetaDto({ pageOptions, itemCount });

    return new PageDto(entities, pageMeta);
  }

  async updateArticle(updateArgs: UpdateArticleDto, userId: number) {
    const article = await this.findOne(updateArgs.id, true);
    const articleUserId = article.user.id;
    if (articleUserId !== userId) {
      throw new UnauthorizedException();
    }
    const updatedArticle = { ...article, ...updateArgs };
    return await this.repo.save(updatedArticle);
  }

  async incrementViewCounter(id: number) {
    const article = await this.findOne(id, true);
    if (!article) {
      throw new BadRequestException(`Article not found`);
    }
    article.views += 1;
    await this.repo.save(article);
  }

  async getArticlesByPreference(preferences: string[]) {
    const suggestedArticlesArrays = await Promise.all(
      preferences.map((preference) => {
        return this.repo
          .createQueryBuilder('article')
          .where(':preference = ANY(article.type)', { preference })
          .andWhere('article.approved = :approved', { approved: true })
          .orderBy('RANDOM()')
          .leftJoinAndSelect('article.user', 'user')
          .getMany();
      }),
    );

    const uniqueArticlesArray = [
      ...new Set(suggestedArticlesArrays.flat().map((article) => article.id)),
    ].map((id) =>
      suggestedArticlesArrays.flat().find((article) => article.id === id),
    );

    return this.shuffleArray(uniqueArticlesArray);
  }

  async getUserArticles(userId: number, isNotSelf?: boolean) {
    const queryBuilder = this.repo
      .createQueryBuilder('article')
      .where('article.userId = :userId', { userId })
      .andWhere('article.approved = :approved', { approved: true })
      .leftJoinAndSelect('article.user', 'user');

    if (isNotSelf) {
      queryBuilder
        .orderBy('article.views', 'DESC')
        .addOrderBy('article.createdAt', 'DESC')
        .limit(4);
    } else {
      queryBuilder.orderBy('article.createdAt', 'DESC');
    }

    return await queryBuilder.getMany();
  }

  async getUserPendingArticles(userId: number) {
    const queryBuilder = this.repo
      .createQueryBuilder('article')
      .where('article.userId = :userId', { userId })
      .andWhere('article.approved = :approved', { approved: false })
      .leftJoinAndSelect('article.user', 'user')
      .orderBy('article.createdAt', 'DESC');

    return await queryBuilder.getMany();
  }

  async getArticleCountsByMonth(year: number) {
    if (year === 2022) {
      return generateFakeAnalyticsData(2022);
    }

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const articles = await this.repo.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });

    return calculateCountsByMonth({
      countEntity: articles,
      year,
      mockedData: generateFakeAnalyticsData(2023),
    });
  }
}
