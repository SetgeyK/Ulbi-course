import { memo } from 'react'
import useTheme from '@/shared/lib/hooks/useTheme/useTheme'
import { Theme } from '@/shared/const/theme'
import LightThemeIcon from '@/shared/assets/icons/theme-light.svg'
import DarkThemeIcon from '@/shared/assets/icons/theme-dark.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

export const ThemeSwitcher = memo(() => {
    const { theme, toggleTheme } = useTheme()
    return(
        <Button 
                onClick={toggleTheme}
                theme={ButtonTheme.CLEAR}
            >
            {theme === Theme.LIGHT 
                    ? <LightThemeIcon />
                    : <DarkThemeIcon />
                }
        </Button>
    )
})

ThemeSwitcher.displayName = 'Themeswitcher'