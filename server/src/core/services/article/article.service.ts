import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entities/article/article.entity';
import { testUser } from '../../entities/test';
import { CreateArticleDto } from '../../entities/article/dtos/createArticle.dto';
import { User } from '../../entities/user/user';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private repo: Repository<Article>) {}

  create(newArticle: CreateArticleDto, user: User) {
    const article = this.repo.create(newArticle);
    article.user = user;

    return this.repo.save(article);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
