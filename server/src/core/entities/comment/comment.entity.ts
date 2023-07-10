import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user';
import { Article } from '../article/article.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user?: User;

  @ManyToOne(() => Article, (article) => article.comments)
  article?: Article;
}
