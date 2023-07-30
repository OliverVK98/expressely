import { ArticleCreateHeaderContainer } from '../ArticleCreateHeaderContainer/ArticleCreateHeaderContainer';
import { ArticleBlockCreatorContainer } from '../ArticleBlockCreatorContainer/ArticleBlockCreatorContainer';
import { ArticleCreateActionsContainer } from '../ArticleCreateActionsContainer/ArticleCreateActionsContainer';
import { VStack } from '@/shared/ui/Stack';

interface ArticleCreateProps {
    className?: string;
    onPreviewButtonClick: () => void;
    onPublishHandler: () => void;
}

export const ArticleCreate = (props: ArticleCreateProps) => {
    const { className, onPreviewButtonClick, onPublishHandler } = props;

    return (
        <VStack gap="16" className={className}>
            <ArticleCreateHeaderContainer />
            <ArticleBlockCreatorContainer />
            <ArticleCreateActionsContainer
                onPublishHandler={onPublishHandler}
                onPreviewButtonClick={onPreviewButtonClick}
            />
        </VStack>
    );
};
