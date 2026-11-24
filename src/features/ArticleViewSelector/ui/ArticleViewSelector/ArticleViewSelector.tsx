import { memo } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/burger.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import PlateIcon from '@/shared/assets/icons/tile.svg';
import PlateIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewsTypes = [
    {
        view: ArticleView.PLATE,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => PlateIcon,
            off: () => PlateIconDeprecated,
        }),
    },
    {
        view: ArticleView.LIST,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Card
                    className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}
                    border={'round_border'}
                >
                    <HStack gap="4">
                        {viewsTypes.map((viewType, index) => (
                            <Icon
                                Svg={viewType.icon}
                                className={classNames('', { [cls.notSelected]: viewType.view !== view })}
                                key={`viewType-${index}`}
                                clickable
                                onClick={onClick(viewType.view)}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
                    {viewsTypes.map((viewType) => (
                        <ButtonDeprecated
                            key={viewType.view}
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                        >
                            <IconDeprecated
                                Svg={viewType.icon}
                                width={24}
                                height={24}
                                className={classNames('', { [cls.notSelected]: viewType.view !== view })}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});

ArticleViewSelector.displayName = 'ArticleViewSelector';
