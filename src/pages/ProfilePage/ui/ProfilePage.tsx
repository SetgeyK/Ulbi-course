import { useParams } from 'react-router'
import csl from './ProfilePage.module.scss'
import { Page } from '@/widgets/Page'
import { EditableProfileCard } from '@/features/editableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ProfileRating } from '@/features/profileRating'

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{id: string}>()

    return(
        <Page className={classNames(csl.page, {}, [className])}>
            <EditableProfileCard  id={id}/>
            <ProfileRating profileId={id}/>
        </Page>
    )
}

export default ProfilePage