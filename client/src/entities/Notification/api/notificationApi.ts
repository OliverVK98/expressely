import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
        setViewed: build.mutation<Notification[], { id: number }>({
            query: ({ id }) => ({
                url: '/notifications',
                method: 'PATCH',
                body: { id },
            }),
        }),
    }),
});

export const useGetNotifications = notificationApi.useGetNotificationsQuery;
export const useSetViewedNotification = notificationApi.useSetViewedMutation;
