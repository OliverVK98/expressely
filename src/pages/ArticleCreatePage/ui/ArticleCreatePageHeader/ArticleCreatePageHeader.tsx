import { useTranslation } from 'react-i18next';
import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCreatePageHeader.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import { getUserAuthData } from '@/entities/User';
import { Article, ArticleType } from '@/entities/Article';
import { ArticleTypeDropdown } from '../ArticleTypeDropdown/ArticleTypeDropdown';

interface ArticleCreatePageHeaderProps {
    className?: string;
    header: Partial<Article>;
    setHeader: Dispatch<SetStateAction<Partial<Article>>>;
}

export const ArticleCreatePageHeader = memo(
    (props: ArticleCreatePageHeaderProps) => {
        const { className, header, setHeader } = props;
        const { t } = useTranslation();
        const userData = useSelector(getUserAuthData);

        const setTypes = useCallback(
            (types: ArticleType[]) => {
                setHeader({
                    ...header,
                    type: types,
                });
            },
            [header, setHeader],
        );

        const onChangeTitle = useCallback(
            (title: string) => {
                setHeader({
                    ...header,
                    title,
                });
            },
            [header, setHeader],
        );

        const onChangeSubtitle = useCallback(
            (subtitle: string) => {
                setHeader({
                    ...header,
                    subtitle,
                });
            },
            [header, setHeader],
        );

        const onChangeUrl = useCallback(
            (img: string) => {
                setHeader({
                    ...header,
                    img,
                });
            },
            [header, setHeader],
        );

        return (
            <Card
                padding="16"
                border="partial"
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
                        value={header.title}
                        onChange={onChangeTitle}
                    />
                    <Input
                        label="Subtitle: "
                        value={header.subtitle}
                        onChange={onChangeSubtitle}
                    />
                    <Input
                        label="Front Image URL: "
                        value={header.img}
                        onChange={onChangeUrl}
                    />
                    <ArticleTypeDropdown
                        types={header.type}
                        setTypes={setTypes}
                    />
                </VStack>
            </Card>
        );
    },
);
