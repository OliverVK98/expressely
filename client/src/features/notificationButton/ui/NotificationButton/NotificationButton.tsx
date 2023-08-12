import React, { memo, useCallback, useState } from 'react';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { BrowserView } from '@/shared/ui/BrowserView';
import { MobileView } from '@/shared/ui/MobileView';
import { Popover } from '@/shared/ui/Popups';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import ExclamationIcon from '@/shared/assets/icons/exclamation.svg';
import { useGetNotificationsCount } from '../../model/api/notificationCount';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);
    const { data, refetch: refetchNotificationCount } =
        useGetNotificationsCount(null, {
            pollingInterval: 5000,
        });

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <>
            {Boolean(data) && (
                <Icon
                    className={cls.notificationCount}
                    Svg={ExclamationIcon}
                    height={12}
                    width={12}
                    color="noColor"
                />
            )}
            <Icon
                className={cls.trigger}
                Svg={NotificationIcon}
                clickable
                height={46}
                width={46}
                onClick={onOpenDrawer}
            />
        </>
    );

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(cls.NotificationButton, {}, [
                        className,
                    ])}
                    direction="bottomLeft"
                    trigger={trigger}
                >
                    <NotificationList
                        className={cls.notifications}
                        refetchNotificationCount={refetchNotificationCount}
                    />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList
                        refetchNotificationCount={refetchNotificationCount}
                    />
                </Drawer>
            </MobileView>
        </div>
    );
});
