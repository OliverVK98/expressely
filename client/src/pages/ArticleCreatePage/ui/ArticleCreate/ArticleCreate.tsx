import { ArticleCreateHeaderContainer } from '../ArticleCreateHeaderContainer/ArticleCreateHeaderContainer';
import { ArticleBlockCreatorContainer } from '../ArticleBlockCreatorContainer/ArticleBlockCreatorContainer';
import { ArticleCreateActionsContainer } from '../ArticleCreateActionsContainer/ArticleCreateActionsContainer';
import { VStack } from '@/shared/ui/Stack';

interface ArticleCreateProps {
    className?: string;
}

export const ArticleCreate = (props: ArticleCreateProps) => {
    const { className } = props;

    return (
        <VStack gap="16" className={className}>
            <ArticleCreateHeaderContainer />
            <ArticleBlockCreatorContainer />
            <ArticleCreateActionsContainer />
        </VStack>
    );
};
