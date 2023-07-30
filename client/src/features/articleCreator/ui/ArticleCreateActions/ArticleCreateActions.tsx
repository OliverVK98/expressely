import { memo } from 'react';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticleCreateActionsProps {
    className?: string;
    firstActionButtonText: string;
    secondActionButtonText: string;
    onFirstActionButtonClick: () => void;
    onSecondActionButtonClick: () => void;
}

export const ArticleCreateActions = memo((props: ArticleCreateActionsProps) => {
    const {
        className,
        onSecondActionButtonClick,
        onFirstActionButtonClick,
        secondActionButtonText,
        firstActionButtonText,
    } = props;

    return (
        <HStack
            max
            justify="end"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Button onClick={onFirstActionButtonClick}>
                {firstActionButtonText}
            </Button>
            <Button color="success" onClick={onSecondActionButtonClick}>
                {secondActionButtonText}
            </Button>
        </HStack>
    );
});
