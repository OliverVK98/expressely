import { Injectable } from '@nestjs/common';
import { Article } from '../../entities/article.entity';
import { plainToClass } from 'class-transformer';
import { ArticleExpandedUserDto } from '../../dtos/article/articleExpandedUser.dto';
import { ArticleDto } from '../../dtos/article/article.dto';

@Injectable()
export class ArticleSerializer {
  serialize(article: Article, expand: string) {
    if (expand === 'user') {
      return plainToClass(ArticleExpandedUserDto, article, {
        excludeExtraneousValues: true,
      });
    } else {
      return plainToClass(ArticleDto, article, {
        excludeExtraneousValues: true,
      });
    }
  }

  serializeMany(articles: Article[], expand: string) {
    return articles.map((article) => this.serialize(article, expand));
  }
}
