import React, { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { THEME_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

interface ThemeProviderProps {
    children: React.ReactNode;
    initialTheme?: Theme;
}

const fallbackTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme;

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
        setThemeInitialized(false);
    }, [initialTheme, isThemeInitialized]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    document.body.className = theme;
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, theme);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
