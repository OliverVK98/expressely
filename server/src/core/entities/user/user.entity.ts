import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../article/article.entity';
import { Notification } from '../notification/notification.entity';
import { Comment } from '../comment/comment.entity';
import { Profile } from '../profile/profile.entity';
import { Rating } from '../rating/rating.entity';

export interface JsonSettings {
  theme?: string;
  isArticlesPageWasOpened: boolean;
}

export interface Features {
  isArticleRatingEnabled: boolean;
  isAppRedesigned: boolean;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('simple-array')
  roles: string[];

  @Column({ type: 'json' })
  features: Features;

  @Column({ type: 'json' })
  jsonSettings: JsonSettings;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Article, (article) => article.user)
  articles?: Article[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications?: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile?: Profile;

  @OneToOne(() => Rating, (rating) => rating.user)
  rating?: Rating[];
}
