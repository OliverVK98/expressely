import { BadRequestException, Injectable } from '@nestjs/common';
import { Between, Equal, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonSettingsDto, User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { Profile } from '../entities/profile.entity';
import { Article } from '../entities/article.entity';
import { ViewedArticleService } from './viewedArticle.service';
import { ArticleService } from './article.service';
import { UserPreference, UserPreferenceAction, UserRole } from '../types/user';
import { generateFakeAnalyticsData } from '../lib/generateFakeAnalytics';
import { calculateCountsByMonth } from '../lib/createCounts';

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

  async isUserAdmin(id: number) {
    const user = await this.findOneById(id);

    return user.roles.includes(UserRole.ADMIN);
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

    if (!article) {
      throw new BadRequestException(`Article not found`);
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

  async getUserCountsByMonth(year: number) {
    if (year === 2022) {
      return generateFakeAnalyticsData(2022);
    }

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const users = await this.repo.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });

    return calculateCountsByMonth({
      countEntity: users,
      year,
      mockedData: generateFakeAnalyticsData(2023),
    });
  }

  async getAdminUserList(id: number) {
    return await this.repo.find({
      where: {
        id: Not(Equal(id)),
      },
    });
  }

  async updateUserRole(userId: number, role: UserRole) {
    const user = await this.findOneById(userId);

    if (!user) {
      throw new BadRequestException(`User with id ${userId} not found`);
    }

    if (role === UserRole.ADMIN) {
      if (user.roles.includes(role)) return user;
      if (!user.roles.includes(UserRole.ADMIN)) {
        user.roles.push(UserRole.ADMIN);
      }
    } else if (role === UserRole.USER) {
      const index = user.roles.indexOf(UserRole.ADMIN);
      if (index !== -1) {
        user.roles.splice(index, 1);
      }
    }

    return await this.repo.save(user);
  }
}
