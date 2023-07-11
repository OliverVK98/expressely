import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';
import { Rating } from '../rating/rating.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  subtitle?: string;

  @Column()
  img: string;

  @Column()
  views: number;

  @CreateDateColumn()
  createdAt?: Date;

  @Column('simple-array')
  type: string[];

  @Column({ type: 'json' })
  blocks: string[];

  @ManyToOne(() => User, (user) => user.articles)
  user?: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments?: Comment[];

  @OneToMany(() => Rating, (rating) => rating.article)
  ratings?: Rating[];
}
