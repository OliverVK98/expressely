import { FeaturesDto, JsonSettingsDto } from '../../entities/user.entity';

export const defaultFeatures: FeaturesDto = {
  isAppRedesigned: true,
  isArticleRatingEnabled: true,
};

export const defaultJsonSettings: JsonSettingsDto = {
  isArticlesPageWasOpened: false,
};
