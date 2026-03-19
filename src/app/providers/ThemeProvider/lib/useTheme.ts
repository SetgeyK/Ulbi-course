import { use } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

function useTheme() {

    const {theme, setTheme} = use(ThemeContext)
    const toggleTheme = () => {
        let newTheme: Theme
        switch(theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT
                break
            case Theme.LIGHT:
                newTheme = Theme.ORANGE
                break
            case Theme.ORANGE:
                newTheme = Theme.DARK
                break
            default:
                newTheme = Theme.LIGHT
        }
        setTheme?.(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return({
        theme: theme || Theme.LIGHT,
        toggleTheme
    })
}

export default useTheme