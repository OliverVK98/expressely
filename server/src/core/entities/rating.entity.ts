import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Article } from './article.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'ratings' })
export class Rating extends AbstractEntity {
  @Column()
  rate: number;

  @Column()
  feedback: string;

  @ManyToOne(() => User, (user) => user.rating)
  user: User;

  @ManyToOne(() => Article, (article) => article.ratings)
  article: Article;
}
