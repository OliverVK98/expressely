import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { Card } from '@/shared/ui/Card';
import { isUserAdmin } from '@/entities/User';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { Icon } from '@/shared/ui/Icon';
import { useDeleteCommentById } from '../../model/api/commentApi';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
    onRefetchComments: () => void;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading, onRefetchComments } = props;
    const isAdmin = useSelector(isUserAdmin);
    const [deleteComment] = useDeleteCommentById();

    const onDeleteButtonHandler = useCallback(
        async (id: number) => {
            await deleteComment(id);
            onRefetchComments();
        },
        [deleteComment, onRefetchComments],
    );

    if (isLoading) {
        return (
            <VStack
                max
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        width={100}
                        height={16}
                        className={cls.username}
                    />
                </div>
                <Skeleton width="100%" height={50} className={cls.text} />
            </VStack>
        );
    }

    if (!comment) return null;

    return (
        <Card
            max
            padding="24"
            border="default"
            className={classNames(cls.CommentCard, {}, [className])}
        >
            {isAdmin && (
                <Icon
                    Svg={CloseIcon}
                    height={26}
                    width={26}
                    className={cls.closeIcon}
                    clickable
                    onClick={() => onDeleteButtonHandler(comment.id)}
                />
            )}
            <VStack
                data-testid="CommentCard.Content"
                max
                gap="8"
                className={classNames(cls.CommentCard, {}, [className])}
            >
                <AppLink to={getRouteProfile(comment.user.id)}>
                    <HStack gap="8">
                        {comment.user.avatar ? (
                            <Avatar size={30} src={comment.user.avatar} />
                        ) : null}
                        <Text bold title={comment.user.username} />
                    </HStack>
                </AppLink>
                <Text text={comment.text} />
            </VStack>
        </Card>
    );
});
