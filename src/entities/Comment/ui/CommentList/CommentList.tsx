import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Comment } from 'entities/Comment';
import { CommentCard } from 'entities/Comment/ui/CommentCard/CommentCard';
import { Text } from 'shared/ui/Text';
import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string,
    comments?: Comment[],
    isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        );
    }

    return (
        <div className={classNames('', {}, [className])}>
            {
                comments?.length
                    ? comments.map((comment) => (
                        <CommentCard
                            className={cls.comment}
                            comment={comment}
                            key={comment.id}
                        />
                    ))
                    : <Text text={t('No comments')} />
            }
        </div>
    );
});
