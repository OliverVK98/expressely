import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRating';
import { getUserAuthData } from '@/entities/User';
import { ErrorCard } from '@/shared/ui/ErrorCard';

export interface ArticleRatingProps {
    className?: string;
    articleId: number;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);

    const {
        data: rating,
        isLoading,
        error,
    } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? 1,
    });
    const [rateArticleMutation, { error: submitError }] = useRateArticle();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            rateArticleMutation({
                articleId,
                rate: starsCount,
                feedback,
            });
        },
        [articleId, rateArticleMutation],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );
    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    if (error) return <ErrorCard />;

    if (isLoading) return <Skeleton width="100%" height={120} />;

    if (submitError) return <ErrorCard />;

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            title={t('Please rate the article')!}
            feedbackTitle={
                t(
                    'Leave your feedback, this helps us improve quality of the content',
                )!
            }
            hasFeedback
            className={classNames('', {}, [className])}
        />
    );
});

export default ArticleRating;
