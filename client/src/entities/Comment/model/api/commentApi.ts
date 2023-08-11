import { rtkApi } from '@/shared/api/rtkApi';

const commentApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        deleteCommentById: build.mutation<void, number>({
            query: (commentId) => ({
                url: '/admin/delete-comment',
                method: 'DELETE',
                body: {
                    commentId,
                },
            }),
        }),
    }),
});

export const useDeleteCommentById = commentApi.useDeleteCommentByIdMutation;
