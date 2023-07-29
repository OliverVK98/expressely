import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCreatePageHeader.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import { getUserAuthData } from '@/entities/User';
import { ArticleTypeDropdown } from '../ArticleTypeDropdown/ArticleTypeDropdown';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    useArticleCreatePageImg,
    useArticleCreatePageSubtitle,
    useArticleCreatePageTitle,
} from '../../model/selectors/articleCreatePageSelectors';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';

interface ArticleCreatePageHeaderProps {
    className?: string;
}

export const ArticleCreatePageHeader = memo(
    (props: ArticleCreatePageHeaderProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const imgSrc = useArticleCreatePageImg();
        const title = useArticleCreatePageTitle();
        const userData = useSelector(getUserAuthData);
        const subtitle = useArticleCreatePageSubtitle();

        const onChangeTitle = useCallback(
            (title: string) => {
                dispatch(articleCreatePageActions.setTitle(title));
            },
            [dispatch],
        );

        const onChangeSubtitle = useCallback(
            (subtitle: string) => {
                dispatch(articleCreatePageActions.setSubtitle(subtitle));
            },
            [dispatch],
        );

        const onChangeUrl = useCallback(
            (img: string) => {
                dispatch(articleCreatePageActions.setImg(img));
            },
            [dispatch],
        );

        return (
            <Card
                padding="16"
                border="default"
                className={classNames(cls.ArticleCreatePageHeader, {}, [
                    className,
                ])}
                max
            >
                <VStack gap="8">
                    <HStack gap="4" justify="between" max>
                        <Text text={t('Tell your story...')} bold size="l" />
                        <HStack gap="4">
                            <Avatar size={32} src={userData!.avatar} />
                            <Text bold text={userData!.username} />
                        </HStack>
                    </HStack>
                    <Input
                        label="Title: "
                        value={title}
                        onChange={onChangeTitle}
                    />
                    <Input
                        label="Subtitle: "
                        value={subtitle}
                        onChange={onChangeSubtitle}
                    />
                    <Input
                        label="Front Image URL: "
                        value={imgSrc}
                        onChange={onChangeUrl}
                    />
                    <ArticleTypeDropdown />
                </VStack>
            </Card>
        );
    },
);
