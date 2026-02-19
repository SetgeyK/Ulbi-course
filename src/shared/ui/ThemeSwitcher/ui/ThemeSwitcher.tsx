import { Theme, useTheme } from 'app/providers/ThemeProvider'

import LightThemeIcon from 'shared/assets/icons/theme-light.svg'
import DarkThemeIcon from 'shared/assets/icons/theme-dark.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

export const ThemeSwitcher = () => {
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
}