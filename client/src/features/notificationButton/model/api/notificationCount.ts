import { rtkApi } from '@/shared/api/rtkApi';

const notificationCountApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotificationsCount: build.query<number, null>({
            query: () => ({
                url: '/notifications/count',
            }),
        }),
    }),
});

export const useGetNotificationsCount =
    notificationCountApi.useGetNotificationsCountQuery;
