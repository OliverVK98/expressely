import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonSettingsDto, User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { Profile } from '../entities/profile.entity';
import { Article } from '../entities/article.entity';
import { ViewedArticleService } from './viewedArticle.service';
import { ArticleService } from './article.service';
import { UserPreference, UserPreferenceAction } from '../types/user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(user: CreateUserDto) {
    const userExist = await this.findOneByEmail(user.email);
    if (userExist) {
      throw new BadRequestException('Email already in use');
    }

    return this.repo.create(user);
  }

  saveUser(user: User, profile: Profile) {
    user.profile = profile;
    return this.repo.save(user);
  }

  findOneById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async updateUser(id: number, updateFields: UpdateUserDto) {
    const user = await this.repo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    return this.repo.save({ ...user, ...updateFields });
  }

  async findOneByIdWithToken(id: number) {
    return await this.repo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.token', 'token')
      .getOne();
  }

  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async setJsonSettings(id: number, jsonSettings: JsonSettingsDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    user.jsonSettings = jsonSettings;

    return this.repo.save(user);
  }

  async updateUserHistory(
    id: number,
    article: Article,
    viewedArticleService: ViewedArticleService,
  ) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    let viewedArticle = await viewedArticleService.findOne(user.id, article.id);

    if (viewedArticle) {
      viewedArticle.timestamp = new Date();
    } else {
      viewedArticle = await viewedArticleService.create(user, article);
    }

    await viewedArticleService.save(viewedArticle);
  }

  async getUserHistory(id: number) {
    const user = await this.repo
      .createQueryBuilder('uniqueUser')
      .where('uniqueUser.id = :id', { id })
      .leftJoinAndSelect('uniqueUser.viewedArticles', 'viewedArticles')
      .leftJoinAndSelect('viewedArticles.article', 'article')
      .leftJoinAndSelect('article.user', 'user')
      .orderBy('viewedArticles.timestamp', 'DESC')
      .getOne();

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    return user.viewedArticles.map((viewedArticle) => viewedArticle.article);
  }

  async getCustomFeed(id: number, articleService: ArticleService) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    if (user.preferences && user.preferences.length > 0) {
      return await articleService.getArticlesByPreference(user.preferences);
    } else {
      throw new BadRequestException(`User with id ${id} has no preferences`);
    }
  }

  async updateUserPreferences(
    userId: number,
    preference: UserPreference,
    action: UserPreferenceAction,
  ) {
    const user = await this.findOneById(userId);

    if (!user) {
      throw new BadRequestException(`User with id ${userId} not found`);
    }

    if (!user.preferences) {
      user.preferences = [];
    }

    const index = user.preferences.indexOf(preference);

    if (action === UserPreferenceAction.ADD) {
      if (index !== -1) {
        // User already has this preference
        return;
      }
      user.preferences.push(preference);
    } else {
      if (index === -1) {
        throw new BadRequestException(
          `User doesn't have preference ${preference}`,
        );
      }

      user.preferences.splice(index, 1);
    }

    return this.repo.save(user);
  }
}
