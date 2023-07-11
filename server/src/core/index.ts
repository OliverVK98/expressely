import { ArticleModule } from './modules/article/article.module';
import { CommentModule } from './modules/comment/comment.module';
import { UserModule } from './modules/user/user.module';
import { NotificationModule } from './modules/notification/notification.module';
import { Article } from './entities/article/article.entity';
import { Rating } from './entities/rating/rating.entity';
import { User } from './entities/user/user.entity';
import { Profile } from './entities/profile/profile.entity';
import { Notification } from './entities/notification/notification.entity';
import { ProfileModule } from './modules/profile/profile.module';
import { RatingModule } from './modules/rating/rating.module';
import { Comment } from './entities/comment/comment.entity';
import { CurrentUserMiddleware } from './middlewares/currentUser/currentUser';

export {
  ArticleModule,
  CommentModule,
  UserModule,
  NotificationModule,
  Article,
  Rating,
  User,
  Profile,
  Notification,
  ProfileModule,
  RatingModule,
  Comment,
  CurrentUserMiddleware,
};
