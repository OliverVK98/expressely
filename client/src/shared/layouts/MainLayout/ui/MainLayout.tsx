import { memo, ReactElement } from 'react';
import cls from './MainLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { BrowserView } from '@/shared/ui/BrowserView';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, content, header, toolbar, sidebar } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <BrowserView>
                <div className={cls.sidebar}>{sidebar}</div>
            </BrowserView>
            <div className={cls.content}>{content}</div>
            <div className={cls.rightbar}>
                <div className={cls.header}>{header}</div>
                <div className={cls.toolbar}>
                    <BrowserView>{toolbar}</BrowserView>
                </div>
            </div>
        </div>
    );
});
