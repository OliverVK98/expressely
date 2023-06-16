import React, { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface ThemeProviderProps {
    children: React.ReactNode;
    initialTheme?: Theme;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
    const { initialTheme, children } = props;
    const [isThemeInitialized, setThemeInitialized] = useState(false);
    const [theme, setTheme] = useState<Theme>(
        initialTheme || fallbackTheme || Theme.LIGHT,
    );

    useEffect(() => {
        if (!isThemeInitialized && initialTheme) {
            setTheme(initialTheme);
            setThemeInitialized(true);
        }
    }, [initialTheme, isThemeInitialized]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    });

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
