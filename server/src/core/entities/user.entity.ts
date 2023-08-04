import { Column, Entity, OneToMany, OneToOne, JoinTable } from 'typeorm';
import { Article } from './article.entity';
import { Notification } from './notification.entity';
import { Comment } from './comment.entity';
import { Profile } from './profile.entity';
import { Rating } from './rating.entity';
import { AbstractEntity } from './abstract.entity';
import { UserRole } from '../types/user';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Token } from './token.entity';
import { ViewedArticle } from './viewedArticle.entity';

export class JsonSettingsDto {
  @IsString()
  @IsOptional()
  theme?: string;

  @IsBoolean()
  isArticlesPageWasOpened: boolean;
}

export class FeaturesDto {
  @IsBoolean()
  isArticleRatingEnabled: boolean;

  @IsBoolean()
  isAppRedesigned: boolean;
}

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column('simple-array')
  roles: UserRole[];

  @Column({ type: 'json' })
  features: FeaturesDto;

  @Column({ type: 'json' })
  jsonSettings: JsonSettingsDto;

  @Column('text', { array: true, nullable: true })
  preferences: string[];

  @OneToMany(() => ViewedArticle, (viewedArticle) => viewedArticle.user)
  @JoinTable()
  viewedArticles: ViewedArticle[];

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
