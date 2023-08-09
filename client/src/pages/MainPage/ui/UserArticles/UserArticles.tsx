import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import cls from './UserArticles.module.scss';
import { UserArticlesList } from './UserArticlesList';

interface UserArticlesProps {
    className?: string;
}

export const UserArticles = memo((props: UserArticlesProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isApproved, setIsApproved] = useState(true);

    const onApprovedClick = useCallback(() => {
        setIsApproved(true);
    }, []);

    const onPendingClick = useCallback(() => {
        setIsApproved(false);
    }, []);

    return (
        <VStack className={className} gap="16" max>
            <Card max padding="0">
                <HStack max gap="4" justify="between">
                    <Button
                        className={cls.button}
                        variant={isApproved ? 'highlighted' : 'clear'}
                        onClick={onApprovedClick}
                    >
                        {t('Published articles')}
                    </Button>
                    <Button
                        className={cls.button}
                        variant={isApproved ? 'clear' : 'highlighted'}
                        onClick={onPendingClick}
                    >
                        {t('Articles pending approval')}
                    </Button>
                </HStack>
            </Card>
            <UserArticlesList fetchApprovedArticles={isApproved} />
        </VStack>
    );
});
