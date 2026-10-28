import { useParams } from 'react-router'

import { EditableProfileCard } from '@/features/editableProfileCard'
import { ProfileRating } from '@/features/profileRating'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'

import csl from './ProfilePage.module.scss'

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{id: string}>()

    return(
        <Page className={classNames(csl.page, {}, [className])} dataTestid='ProfilePage'>
            <EditableProfileCard  id={id}/>
            <ProfileRating profileId={id}/>
        </Page>
    )
}

export default ProfilePage