import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationAPI = rtkApi.injectEndpoints({
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

export const useGetNotifications = notificationAPI.useGetNotificationsQuery;
export const useSetViewedNotification = notificationAPI.useSetViewedMutation;
