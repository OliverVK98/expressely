import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import cls from './ArticleAdditionalInfo.module.scss';

interface ArticleAdditionalInfoProps {
    className?: string;
    author?: User;
    createdAt?: string;
    views?: number;
    onEdit: () => void;
    canEdit: boolean;
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const { className, author, views, createdAt, onEdit, canEdit } = props;
        const { t } = useTranslation();

        return (
            <VStack gap="16" className={className}>
                <HStack gap="8">
                    <Avatar src={author?.avatar} size={32} />
                    <Text text={author?.username} bold />
                    <Text text={createdAt} />
                </HStack>
                {canEdit && (
                    <Button className={cls.button} onClick={onEdit}>
                        {t('Edit')}
                    </Button>
                )}
                <HStack gap="4" justify="center" max>
                    <Text text={String(views)} />
                    <Text text={t('views')} />
                </HStack>
            </VStack>
        );
    },
);
