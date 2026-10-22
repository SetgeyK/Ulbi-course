import cls from './Profile.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ProfileProps {
    className?: string
}

export const Profile = ({ className }: ProfileProps) => {
    return(
        <div className={classNames(cls.profile, {}, [className])}>
        </div>
    )
}