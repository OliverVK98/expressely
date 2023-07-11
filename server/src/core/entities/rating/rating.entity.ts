import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  rate: number;

  @Column()
  feedback: string;

  @ManyToOne(() => User, (user) => user.rating)
  user?: User;

  @ManyToOne(() => Article, (article) => article.ratings)
  article?: Article;
}
