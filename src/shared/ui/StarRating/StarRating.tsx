import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import { Icon } from '../Icon/Icon'
import StarIcon from '@/shared/assets/icons/star.svg'
import { useState } from 'react'

interface StarRatingProps {
    className?: string,
    onSelect?: (starstCount: number) => void,
    size?: number,
    selectedStars?: number
}

const start = [1, 2, 3, 4, 5]

export const StarRating = (props: StarRatingProps) => {
    const {
        className,
        size = 30,
        selectedStars = 0,
        onSelect
    } = props
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))
    const [currentStarsCount, setCurrentStarsCount] = useState<number>(selectedStars)

    const onHover = (starsCount: number) => () => {
        if(!isSelected) {
            setCurrentStarsCount(starsCount)
        }
    }

    const onLeave = () => {
        if(!isSelected) {
            setCurrentStarsCount(0)
        }
    }

    const onClick = (starsCount: number) => () => {
        if(!isSelected) {
            onSelect?.(starsCount)
            setCurrentStarsCount(starsCount)
            setIsSelected(true)
        }
    }

    return(
        <div className={classNames(cls.starRating, {}, [className])}>
            {start.map(starNumber => (
                <Icon
                    Svg={StarIcon}
                    key={starNumber}
                    className={classNames(
                        cls.starIcon,
                        {
                            [cls.hovered]: currentStarsCount >= starNumber,
                            [cls.selected]: isSelected
                        },
                        []
                    )}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            )
            )}
        </div>
    )
}