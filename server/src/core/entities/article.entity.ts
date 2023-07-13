import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Rating } from './rating.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'articles' })
export class Article extends AbstractEntity {
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  subtitle: string;

  @Column()
  img: string;

  @Column()
  views: number;

  @Column('text', { array: true })
  type: string[];

  @Column({ type: 'json' })
  blocks: string[];

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.article)
  ratings: Rating[];
}
