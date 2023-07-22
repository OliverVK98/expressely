export interface Rating {
    rate: number;
    feedback: string | null;
    createdAt: string;
    userId: number;
    articleId: number;
}

export interface CreateRatingDto {
    feedback?: string;
    rate: number;
    articleId: number;
}
