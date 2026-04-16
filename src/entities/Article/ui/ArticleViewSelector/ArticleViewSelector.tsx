import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleViewSelector.module.scss'
import { ArticleView } from '../../modal/types/article'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import ListIcon from 'shared/assets/icons/list-24-24.svg'
import PlateIcon from 'shared/assets/icons/tiled-24-24.svg'

interface ArticleViewSelectorProps {
    className?: string,
    view: ArticleView,
    onViewClick?: (view:ArticleView) => void
}

const viewsTypes = [
    {
        view: ArticleView.PLATE,
        icon: PlateIcon
    },
    {
        view: ArticleView.LIST,
        icon: ListIcon
    }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {
        className,
        view,
        onViewClick
    } = props

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView)
    }

    return(
        <div className={classNames('', {}, [className])}>
            {viewsTypes.map((viewType) => (
                <Button
                    key={viewType.view}
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon 
                        Svg={viewType.icon}
                        className={classNames('', {[cls.notSelected]: viewType.view !== view})}
                    />
                </Button>
            ))}
        </div>
    )
})

ArticleViewSelector.displayName = 'ArticleViewSelector'