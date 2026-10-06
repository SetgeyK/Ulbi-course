import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotificationList.module.scss'
import { useNotifications } from '../../api/notificationApi'
import { VStack } from 'shared/ui/Stack'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

interface NotificationListProps {
    className?: string
}

export const NotificationList = (props: NotificationListProps) => {
    const {
        className
    } = props
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 7000
    })

    if(isLoading) {
        return (
            <VStack
                max
                gap='16'
                className={classNames(cls.notificationList, {}, [className])}
            >
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
                <Skeleton width={'100%'} border={'8px'} height={'80px'}/>
            </VStack>
        )
    }

    return(
        
        <VStack
            max
            gap='16'
            className={classNames(cls.notificationList, {}, [className])}
        >
            {
                data?.map(item => (
                    <NotificationItem key={item.id} item={item}/>
                ))
            }
        </VStack>
    )
}