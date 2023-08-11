import { useTranslation } from 'react-i18next';
import React, { memo, useState } from 'react';
import { AdminUsersController } from '../AdminUsersController/AdminUsersController';
import { AdminPendingArticles } from '../AdminPendingArticles/AdminPendingArticles';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import cls from './AdminControllers.module.scss';

interface AdminControllersProps {
    className?: string;
}

export const AdminControllers = memo((props: AdminControllersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isUserList, setIsUserList] = useState(false);

    const onUserListClick = () => setIsUserList(true);
    const onPendingArticlesClick = () => setIsUserList(false);

    return (
        <VStack gap="8" className={className} max>
            <Card max padding="0">
                <HStack max gap="4" justify="between">
                    <Button
                        className={cls.button}
                        variant={!isUserList ? 'highlighted' : 'clear'}
                        onClick={onPendingArticlesClick}
                    >
                        {t('Unapproved Articles')}
                    </Button>
                    <Button
                        className={cls.button}
                        variant={isUserList ? 'highlighted' : 'clear'}
                        onClick={onUserListClick}
                    >
                        {t('Website User List')}
                    </Button>
                </HStack>
            </Card>
            {!isUserList && <AdminPendingArticles />}
            {isUserList && <AdminUsersController />}
        </VStack>
    );
});
