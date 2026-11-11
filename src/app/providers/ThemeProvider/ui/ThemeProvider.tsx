import { FC, useEffect, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children?: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    useEffect(() => {
        setTheme(defaultTheme);
    }, [defaultTheme]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return <ThemeContext value={defaultProps}>{children}</ThemeContext>;
};

export default ThemeProvider;
