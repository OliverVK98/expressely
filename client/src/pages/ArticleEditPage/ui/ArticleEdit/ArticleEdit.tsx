import { ArticleCreateHeaderContainer } from '../ArticleCreateHeaderContainer/ArticleCreateHeaderContainer';
import { ArticleBlockCreatorContainer } from '../ArticleBlockCreatorContainer/ArticleBlockCreatorContainer';
import { ArticleCreateActionsContainer } from '../ArticleCreateActionsContainer/ArticleCreateActionsContainer';
import { VStack } from '@/shared/ui/Stack';
import { ArticleExpandedUser } from '@/entities/Article';

interface ArticleEditProps {
    className?: string;
    onPreviewButtonClick: () => void;
    onPublishHandler: () => void;
    article?: ArticleExpandedUser;
    isLoading?: boolean;
    error?: string;
}

export const ArticleEdit = (props: ArticleEditProps) => {
    const {
        className,
        onPreviewButtonClick,
        onPublishHandler,
        article,
        isLoading,
        error,
    } = props;

    return (
        <VStack gap="16" className={className}>
            <ArticleCreateHeaderContainer
                article={article}
                isLoading={isLoading}
            />
            <ArticleBlockCreatorContainer
                article={article}
                isLoading={isLoading}
            />
            <ArticleCreateActionsContainer
                onPublishHandler={onPublishHandler}
                onPreviewButtonClick={onPreviewButtonClick}
            />
        </VStack>
    );
};