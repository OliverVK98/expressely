import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dtos/article/createArticle.dto';
import { User } from '../entities/user.entity';
import { PageOptionsDto } from '../dtos/page/pageOptions.dto';
import { PageMetaDto } from '../dtos/page/pageMeta.dto';
import { PageDto } from '../dtos/page/page.dto';
import { UpdateArticleDto } from '../dtos/article/updateArticle.dto';
import { ArticleType } from '../types/article';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private repo: Repository<Article>) {}

  async create(newArticle: CreateArticleDto, user: User) {
    const article = await this.repo.create(newArticle);
    article.user = user;

    return await this.repo.save(article);
  }

  async findOne(id: number) {
    return await this.repo
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('article.user', 'user')
      .getOne();
  }

  async getArticles(pageOptions: PageOptionsDto) {
    const queryBuilder = this.repo.createQueryBuilder('article');

    queryBuilder
      .leftJoinAndSelect('article.user', 'user')
      .orderBy(
        `article.${pageOptions.sort}`,
        pageOptions.order.toUpperCase() as 'ASC' | 'DESC',
      )
      .skip(pageOptions.skip)
      .take(pageOptions.limit)
      .where(`article.title ILIKE :search`, {
        search: `%${pageOptions.search}%`,
      });

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
    const article = await this.findOne(updateArgs.id);
    const articleUserId = article.user.id;
    if (articleUserId !== userId) {
      throw new UnauthorizedException();
    }
    const updatedArticle = { ...article, ...updateArgs };
    return await this.repo.save(updatedArticle);
  }

  async incrementViewCounter(id: number) {
    const article = await this.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    article.views += 1;
    await this.repo.save(article);
  }

  async getArticlesByPreference(preferences: string[]) {
    return await this.repo
      .createQueryBuilder('article')
      .distinct(true)
      .where(':preferences @> article.type', { preferences })
      .orderBy('RANDOM()')
      .getMany();
  }
}
