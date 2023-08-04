import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { CurrentUserMiddleware } from '../middlewares/currentUser';
import { UserSerializer } from '../serializers/user/user.serializer';
import { Article } from '../entities/article.entity';
import { ArticleService } from '../services/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Article])],
  controllers: [UserController],
  providers: [UserService, UserSerializer, ArticleService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
