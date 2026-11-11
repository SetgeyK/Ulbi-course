import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';
import DarkThemeIcon from '@/shared/assets/icons/theme-dark.svg';
import LightThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { Theme } from '@/shared/const/theme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import useTheme from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui/Button';

export const ThemeSwitcher = memo(() => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();
    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [toggleTheme, dispatch]);
    return (
        <Button onClick={onToggleHandler} theme={ButtonTheme.CLEAR}>
            {theme === Theme.LIGHT ? <LightThemeIcon /> : <DarkThemeIcon />}
        </Button>
    );
});

ThemeSwitcher.displayName = 'Themeswitcher';
