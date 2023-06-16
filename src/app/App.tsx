import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from '@/app/providers/router';
import { getUserInit, initAuthData } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Sidebar } from '@/widgets/Sidebar';
import { Navbar } from '@/widgets/Navbar';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from '@/app/lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const init = useSelector(getUserInit);
    const toolbar = useAppToolbar();

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!init) {
        return (
            <div id="app" className={classNames('app', {}, [theme])}>
                <AppLoaderLayout />
            </div>
        );
    }

    return (
        <div id="app" className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar />}
                    content={<AppRouter />}
                    sidebar={<Sidebar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    );
};

// TODO: chromatic screenshot testing

export default withTheme(App);
