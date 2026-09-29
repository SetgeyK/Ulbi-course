import { useParams } from 'react-router'
import { Page } from 'widgets/Page/Page'
import { EditableProfileCard } from 'features/editableProfileCard'
import { Text } from 'shared/ui/Text/Text'
import { classNames } from 'shared/lib/classNames/classNames'

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{id: string}>()

    if(!id) {
        return <Text text='Профиль не найден'/>
    }
    
    return(
        <Page className={classNames('', {}, [className])}>
            <EditableProfileCard  id={id}/>
        </Page>
    )
}

export default ProfilePage