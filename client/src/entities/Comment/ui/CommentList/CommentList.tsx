import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
    onRefetchComments: () => void;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments, isLoading, onRefetchComments } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack max gap="16" className={classNames('', {}, [className])}>
                <CommentCard onRefetchComments={onRefetchComments} isLoading />
                <CommentCard onRefetchComments={onRefetchComments} isLoading />
                <CommentCard onRefetchComments={onRefetchComments} isLoading />
            </VStack>
        );
    }

    return (
        <VStack max gap="16" className={classNames('', {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        comment={comment}
                        key={comment.id}
                        onRefetchComments={onRefetchComments}
                    />
                ))
            ) : (
                <Text text={t('No comments')} />
            )}
        </VStack>
    );
});
