import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { AppRouter } from './providers/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserInited, userActions } from '@/entities/User'
import useTheme from '@/shared/lib/hooks/useTheme/useTheme'

export const App = () => {
    const {theme} = useTheme()
    const dispatch = useDispatch()
    const inited = useSelector(getUserInited)
    
    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return(
        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <div className='content-page'>
                <Sidebar />
                {inited && <AppRouter />}
            </div>
        </div>
    )
}