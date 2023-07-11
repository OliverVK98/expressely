import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entities/article/article.entity';
import { CreateArticleDto } from '../../entities/article/dtos/createArticle.dto';
import { User } from '../../entities/user/user.entity';
import {
  ArticleOrderType,
  ArticleSortType,
  ArticleType,
} from '../../types/article/article';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private repo: Repository<Article>) {}

  async create(newArticle: CreateArticleDto, user: User) {
    const article = await this.repo.create(newArticle);
    article.user = user;

    return await this.repo.save(article);
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async findMany(
    sort: ArticleSortType,
    order: ArticleOrderType,
    search: string,
    type: ArticleType,
  ) {
    const queryBuilder = this.repo.createQueryBuilder('article');

    if (sort) {
      queryBuilder.orderBy(`article.${sort}`, order || 'ASC');
    }

    if (search) {
      queryBuilder.where(`article.title LIKE :search`, {
        search: `%${search}%`,
      });
    }

    if (type && type !== 'All') {
      queryBuilder.andWhere(`article.type::text[] && ANY(:types)`, { type });
    }

    return await queryBuilder.getMany();
  }
}
