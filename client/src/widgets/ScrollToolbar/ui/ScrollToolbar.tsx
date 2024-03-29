import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { BrowserView } from '@/shared/ui/BrowserView';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
    const { className } = props;

    return (
        <VStack
            justify="center"
            align="center"
            max
            className={classNames(cls.ScrollToolbar, {}, [className])}
        >
            <BrowserView>
                <ScrollToTopButton />
            </BrowserView>
        </VStack>
    );
});
