import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../types/sidebar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainPageIcon from 'shared/assets/icons/main-20-20.svg'
import AboutPageIcon from 'shared/assets/icons/about-20-20.svg'
import ProfilePageIcon from 'shared/assets/icons/profile-20-20.svg'
import ArticlePageIcon from 'shared/assets/icons/article-20-20.svg'

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                text: 'Главная страница',
                Icon: MainPageIcon,
            },
            {
                path: RoutePath.about,
                text: 'О сайте',
                Icon: AboutPageIcon,
            }
        ]
        if (userData) {
            sidebarItemsList.push(
                {
                    path: `${RoutePath.profile}${userData.id}`,
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
            )
        }
        return sidebarItemsList
    }
)