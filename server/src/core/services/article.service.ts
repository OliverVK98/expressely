import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dtos/article/createArticle.dto';
import { User } from '../entities/user.entity';
import { PageOptionsDto } from '../dtos/page/pageOptions.dto';
import { PageMetaDto } from '../dtos/page/pageMeta.dto';
import { PageDto } from '../dtos/page/page.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private repo: Repository<Article>) {}

  async create(newArticle: CreateArticleDto, user: User) {
    const article = await this.repo.create(newArticle);
    article.user = user;

    return await this.repo.save(article);
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      relations: {
        user: true,
      },
      where: {
        id,
      },
    });
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

    if (pageOptions.type !== 'All') {
      queryBuilder.andWhere('article.type @> ARRAY[:type]', {
        type: pageOptions.type,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMeta = new PageMetaDto({ pageOptions, itemCount });

    return new PageDto(entities, pageMeta);
  }
}
