import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { AuthorsMemo } from './AuthorsMemo';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCreatePageSidebar.module.scss';
import { PublicationRules } from './PublicationRules';

interface ArticleCreatePageSidebarProps {
    className?: string;
}

export const ArticleCreatePageSidebar = memo(
    (props: ArticleCreatePageSidebarProps) => {
        const { className } = props;
        const { t } = useTranslation();

        return (
            <VStack
                className={classNames(cls.ArticleCreatePageSidebar, {}, [
                    className,
                ])}
                gap="32"
            >
                <AuthorsMemo />
                <PublicationRules />
            </VStack>
        );
    },
);
