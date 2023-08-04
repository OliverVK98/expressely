import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';
import { Article } from './article.entity';

@Entity({ name: 'viewedArticles' })
export class ViewedArticle extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.viewedArticles)
  user: User;

  @ManyToOne(() => Article, (article) => article.viewedArticles)
  article: Article;

  @Column()
  timestamp: Date;
}
