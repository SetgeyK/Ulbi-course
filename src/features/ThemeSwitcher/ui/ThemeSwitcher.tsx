import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import useTheme from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';

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
            <Icon Svg={ThemeIcon} width={40} height={40} inverted />
        </Button>
    );
});

ThemeSwitcher.displayName = 'Themeswitcher';
