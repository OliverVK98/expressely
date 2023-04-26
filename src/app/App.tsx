import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useTheme } from 'app/providers/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInit, userActions } from 'entities/User';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const init = useSelector(getUserInit);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', { theme })}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {init && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
