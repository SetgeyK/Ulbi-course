import { FC, SVGProps } from 'react'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

import MainPageIcon from 'shared/assets/icons/main-20-20.svg'
import AboutPageIcon from 'shared/assets/icons/about-20-20.svg'
import ProfilePageIcon from 'shared/assets/icons/profile-20-20.svg'
import ArticlePageIcon from 'shared/assets/icons/article-20-20.svg'

export interface SidebarItemType {
    path: string,
    text: string,
    Icon: FC<SVGProps<SVGSVGElement>>,
    authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        text: 'Главная страница',
        Icon: MainPageIcon,
    },
    {
        path: RoutePath.about,
        text: 'О сайте',
        Icon: AboutPageIcon,
    },
    {
        path: RoutePath.profile,
        text: 'Профиль',
        Icon: ProfilePageIcon,
        authOnly: true
    },
    {
        path: RoutePath.articles,
        text: 'Статьи',
        Icon: ArticlePageIcon,
        authOnly: true
    }
]