import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile';

interface BrowserViewProps {
    className?: string;
    children: ReactNode;
}

export const BrowserView = memo((props: BrowserViewProps) => {
    const { className, children } = props;
    const isMobile = useIsMobile();

    if (isMobile) {
        return null;
    }

    return <div className={classNames('', {}, [className])}>{children}</div>;
});
