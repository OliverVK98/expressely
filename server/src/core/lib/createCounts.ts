import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { Comment } from '../entities/comment.entity';
import { ViewedArticle } from '../entities/viewedArticle.entity';

interface CreateCountsArgs {
  countEntity: Article[] | User[] | Comment[] | ViewedArticle[];
  year: number;
  mockedData?: Record<string, number>;
}
export function calculateCountsByMonth({
  countEntity,
  year,
  mockedData,
}: CreateCountsArgs) {
  const counts = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  for (let i = 0; i < countEntity.length; i++) {
    const month = new Date(countEntity[i].createdAt).getMonth();
    const monthName = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(new Date(year, month));
    counts[monthName]++;
  }

  if (mockedData) return { ...counts, ...mockedData };

  return counts;
}
