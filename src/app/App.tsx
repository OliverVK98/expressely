import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from '@/app/providers/router';
import { getUserInit, initAuthData } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const init = useSelector(getUserInit);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!init) {
        return <PageLoader />;
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            {init && <AppRouter />}
        </div>
    );
};

export default App;
