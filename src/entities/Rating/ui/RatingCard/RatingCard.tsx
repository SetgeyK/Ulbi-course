import { useCallback, useState } from 'react'
import { MobileView, BrowserView } from 'react-device-detect'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import { Card } from '@/shared/ui/Card/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { StarRating } from '@/shared/ui/StarRating/StarRating'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Input } from '@/shared/ui/Input/Input'
import { Button, ButtonsSize, ButtonTheme } from '@/shared/ui/Button/Button'

interface RatingCardProps {
    className?: string,
    title?: string,
    feedbackTitle?: string,
    hasFeedback?: boolean,
    onCancel?: (startCount: number) => void,
    onAccept?: (startCount: number, feedback?: string) => void
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel
    } = props

    const [isModalOpen, setIsOpenModal] = useState(false)
    const [starsCount, setStarsCount] = useState(0)
    const [feedback, setFeedback] = useState<string>('')

    const onSelectStart = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount)
        if(hasFeedback) {
            setIsOpenModal(true)
        } else {
            onAccept?.(selectedStarsCount)
        }
    }, [hasFeedback, onAccept])

    const acceptHandler = useCallback(() => {
        setIsOpenModal(false)
        onAccept?.(starsCount, feedback)
    }, [onAccept, starsCount, feedback])

    const cancelHandler = useCallback(() => {
        setIsOpenModal(false)
        onCancel?.(starsCount)
    }, [starsCount, onCancel])

    const modalContent = (
        <>
            <Text text={feedbackTitle} />
            <Input placeholder='Ваш отзыв' value={feedback} onChange={setFeedback}/>
        </>
    )

    return(
        <Card className={classNames('', {}, [className])}>
            <VStack align='center' gap='8'>
                <Text title={title}/>
                <StarRating size={40} onSelect={onSelectStart}/>
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap='32'>
                        {modalContent}
                        <HStack max gap='16' justify='end'>
                            <Button
                            theme={ButtonTheme.OUTLINE_RED}
                            onClick={cancelHandler}
                        >
                                Закрыть
                            </Button>
                            <Button
                            theme={ButtonTheme.OUTLINE_GREEN}
                            onClick={acceptHandler}
                        >
                                Отправить
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandler} lazy>
                    <VStack gap='32'>
                        {modalContent}
                        <Button
                            theme={ButtonTheme.OUTLINE_GREEN}
                            onClick={acceptHandler}
                            size={ButtonsSize.L}
                            fullWidth
                        >
                            Отправить
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    )
}