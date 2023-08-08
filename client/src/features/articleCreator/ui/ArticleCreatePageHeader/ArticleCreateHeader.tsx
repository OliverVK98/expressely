import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCreatePageHeader.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import { User } from '@/entities/User';
import { ArticleTypeDropdown } from '../ArticleTypeDropdown/ArticleTypeDropdown';
import { UserArticleType } from '@/entities/Article';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleCreateHeaderProps {
    className?: string;
    userData?: User;
    imgSrc?: string;
    title?: string;
    subtitle?: string;
    onChangeTitle: (title: string) => void;
    onChangeSubtitle: (subtitle: string) => void;
    onChangeUrl: (img: string) => void;
    onTypeAddClick: () => void;
    onChangeType: (newType: UserArticleType, index: number) => void;
    types?: UserArticleType[];
    isLoading?: boolean;
    isEditMode: boolean;
}

export const ArticleCreateHeader = memo((props: ArticleCreateHeaderProps) => {
    const {
        className,
        onChangeUrl,
        onChangeTitle,
        onChangeSubtitle,
        title,
        subtitle,
        imgSrc,
        userData,
        onTypeAddClick,
        types,
        onChangeType,
        isLoading,
        isEditMode,
    } = props;
    const { t } = useTranslation();

    if (isLoading)
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
                        <Text
                            text={t(
                                isEditMode
                                    ? 'Editing article...'
                                    : 'Tell your story...',
                            )}
                            bold
                            size="l"
                        />
                        <HStack gap="4">
                            <Skeleton border="round" height={32} width={32} />
                            <Skeleton height={32} width={40} />
                        </HStack>
                    </HStack>
                    <Skeleton height={50} width="max" />
                    <Skeleton height={50} width="max" />
                    <Skeleton height={50} width="max" />
                    <Skeleton height={50} width="max" />
                </VStack>
            </Card>
        );

    return (
        <Card
            padding="16"
            border="default"
            className={classNames(cls.ArticleCreatePageHeader, {}, [className])}
            max
        >
            <VStack gap="8">
                <HStack gap="4" justify="between" max>
                    <Text
                        text={t(
                            isEditMode
                                ? 'Editing article...'
                                : 'Tell your story...',
                        )}
                        bold
                        size="l"
                    />
                    <HStack gap="4">
                        <Avatar size={32} src={userData?.avatar} />
                        <Text bold text={userData?.username} />
                    </HStack>
                </HStack>
                <Input label="Title: " value={title} onChange={onChangeTitle} />
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
                <ArticleTypeDropdown
                    types={types}
                    onTypeAddClick={onTypeAddClick}
                    onChangeType={onChangeType}
                />
            </VStack>
        </Card>
    );
});
