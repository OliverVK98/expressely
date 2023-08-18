import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StickyContentLayout.module.scss';
import { BrowserView } from '@/shared/ui/BrowserView';

interface StickyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
    const { className, left, right, content } = props;

    return (
        <div className={classNames(cls.StickyContentLayout, {}, [className])}>
            <BrowserView>
                {left && <div className={cls.left}>{left}</div>}
            </BrowserView>
            <div className={cls.content}>{content}</div>
            <BrowserView>
                {right && <div className={cls.right}>{right}</div>}
            </BrowserView>
        </div>
    );
});
