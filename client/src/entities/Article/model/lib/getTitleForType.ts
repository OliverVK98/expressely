import {
    articleFeedTypeDescription,
    UserArticleType,
} from '../../model/consts/consts';

export function getTitleForType(articleType: UserArticleType): string {
    const description = articleFeedTypeDescription.find(
        (item) => item.title === articleType,
    );
    return description!.title;
}
