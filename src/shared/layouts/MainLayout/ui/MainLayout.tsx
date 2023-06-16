import { useTranslation } from 'react-i18next';
import { memo, ReactElement } from 'react';
import cls from './MainLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, content, header, toolbar, sidebar } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.sidebar}>{sidebar}</div>
            <div className={cls.content}>{content}</div>
            <div className={cls.rightbar}>
                <div className={cls.header}>{header}</div>
                <div className={cls.toolbar}>{toolbar}</div>
            </div>
        </div>
    );
});
