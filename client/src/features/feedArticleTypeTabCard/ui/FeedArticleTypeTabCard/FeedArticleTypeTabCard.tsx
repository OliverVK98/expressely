import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Icon } from '@/shared/ui/Icon';
import CheckBoxIcon from '@/shared/assets/icons/checkbox.svg';
import AddBoxIcon from '@/shared/assets/icons/addbox.svg';
import cls from './FeedArticleTypeTabCard.module.scss';
import { Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateUserPreferences, User } from '@/entities/User';
import { ArticleType } from '@/entities/Article';

// TODO: remove optional
interface FeedArticleTypeTabCardProps {
    className?: string;
    title: ArticleType;
    text: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    userAuthData?: User;
}

export const FeedArticleTypeTabCard = memo(
    (props: FeedArticleTypeTabCardProps) => {
        const { className, title, text, Svg, userAuthData } = props;
        const dispatch = useAppDispatch();
        const isAdded = userAuthData?.preferences?.includes(title);

        const handleOnAddClick = useCallback(() => {
            dispatch(
                updateUserPreferences({
                    action: 'add',
                    preference: title,
                }),
            );
        }, [dispatch, title]);

        const handleOnRemoveClick = useCallback(() => {
            dispatch(
                updateUserPreferences({
                    action: 'delete',
                    preference: title,
                }),
            );
        }, [dispatch, title]);

        return (
            <HStack
                className={classNames('', {}, [className])}
                max
                justify="between"
                align="center"
                gap="8"
            >
                <HStack gap="8">
                    <HStack
                        className={cls.iconWrapper}
                        justify="center"
                        align="center"
                    >
                        <Icon Svg={Svg} />
                    </HStack>
                    <VStack>
                        <Text size="s" bold text={title} />
                        <Text size="s" text={text} />
                    </VStack>
                </HStack>
                {isAdded && (
                    <Icon
                        Svg={CheckBoxIcon}
                        clickable
                        onClick={handleOnRemoveClick}
                        isGreen
                    />
                )}
                {!isAdded && (
                    <Icon
                        Svg={AddBoxIcon}
                        clickable
                        onClick={handleOnAddClick}
                    />
                )}
            </HStack>
        );
    },
);
