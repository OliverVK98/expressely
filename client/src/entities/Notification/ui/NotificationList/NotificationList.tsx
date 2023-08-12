import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useGetNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import cls from './NotificationList.module.scss';
import { Text } from '@/shared/ui/Text';

interface NotificationListProps {
    className?: string;
    refetchNotificationCount: () => void;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className, refetchNotificationCount } = props;
    const { t } = useTranslation();
    // TODO: change to 5 seconds
    const { data, isLoading, refetch } = useGetNotifications(null, {
        pollingInterval: 20000,
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    if (data?.length === 0)
        return (
            <VStack
                gap="16"
                max
                className={classNames(cls.NotificationList, {}, [className])}
                align="center"
                justify="center"
            >
                <Text text={t(`You don't have any notifications`)} size="l" />
            </VStack>
        );

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem
                    key={item.id}
                    item={item}
                    refetch={refetch}
                    refetchNotificationCount={refetchNotificationCount}
                />
            ))}
        </VStack>
    );
});
