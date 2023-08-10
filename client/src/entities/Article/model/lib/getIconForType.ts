import { SVGProps, VFC } from 'react';
import {
    articleFeedTypeDescription,
    UserArticleType,
} from '../../model/consts/consts';

export function getIconForType(
    articleType: UserArticleType,
): VFC<SVGProps<SVGSVGElement>> {
    const description = articleFeedTypeDescription.find(
        (item) => item.title === articleType,
    );
    return description!.icon;
}
