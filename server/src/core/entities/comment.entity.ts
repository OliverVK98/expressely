import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Article } from './article.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'comments' })
export class Comment extends AbstractEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;
}
