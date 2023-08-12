import { memo, useCallback } from 'react';
import { Card } from '@/shared/ui/Card';
import { AppLink } from '@/shared/ui/AppLink';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { Icon } from '@/shared/ui/Icon';
import { useSetViewedNotification } from '../../api/notificationApi';

interface NotificationItemProps {
    className?: string;
    item: Notification;
    refetch: () => void;
    refetchNotificationCount: () => void;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item, refetch, refetchNotificationCount } = props;
    const [setViewed] = useSetViewedNotification();
    const handleViewed = useCallback(async () => {
        await setViewed({ id: item.id });
        refetch();
        refetchNotificationCount();
    }, [item.id, refetch, refetchNotificationCount, setViewed]);

    const content = (
        <Card
            className={classNames(cls.NotificationItem, {}, [className])}
            variant="light"
        >
            <Icon
                Svg={CloseIcon}
                height={26}
                width={26}
                className={cls.closeIcon}
                clickable
                onClick={handleViewed}
            />
            <Text title={item.title} size="s" />
            <Text title={item.description} size="s" />
        </Card>
    );

    if (item.href) {
        return (
            <Card
                className={classNames(cls.NotificationItem, {}, [className])}
                variant="light"
            >
                <Icon
                    Svg={CloseIcon}
                    height={26}
                    width={26}
                    className={cls.closeIcon}
                    clickable
                    onClick={handleViewed}
                />
                <AppLink className={cls.link} to={item.href}>
                    <Text title={item.title} size="s" />
                    <Text title={item.description} size="s" />
                </AppLink>
            </Card>
        );
    }

    return content;
});
