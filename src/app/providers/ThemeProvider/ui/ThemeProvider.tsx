import { FC, useMemo, useState } from 'react'

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage'
import { Theme } from '@/shared/const/theme'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT

interface ThemeProviderProps {
    initialTheme?: Theme
    children?: React.ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({children, initialTheme}) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme])


    return (
        <ThemeContext value={defaultProps}>
            {children}
        </ThemeContext>
    )
}

export default ThemeProvider