import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import AboutPageIcon from '@/shared/assets/icons/about-20-20.svg'
import ArticlePageIcon from '@/shared/assets/icons/article-20-20.svg'
import MainPageIcon from '@/shared/assets/icons/main-20-20.svg'
import ProfilePageIcon from '@/shared/assets/icons/profile-20-20.svg'
import {
    getRouteMain, 
    getRouteAbout,
    getRouteProfile,
    getRouteArticles
} from '@/shared/const/router';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: 'Главная страница',
                Icon: MainPageIcon,
            },
            {
                path: getRouteAbout(),
                text: 'О сайте',
                Icon: AboutPageIcon,
            }
        ]
        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    text: 'Профиль',
                    Icon: ProfilePageIcon,
                    authOnly: true
                },
                {
                    path: getRouteArticles(),
                    text: 'Статьи',
                    Icon: ArticlePageIcon,
                    authOnly: true
                }
            )
        }
        return sidebarItemsList
    }
)