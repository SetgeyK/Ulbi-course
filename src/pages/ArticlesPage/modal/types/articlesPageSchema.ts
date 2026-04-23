import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ArticleSortFields, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article, string> { 
    isLoading?: boolean,
    error?: string,
    // pagination
    page: number,
    limit: number,
    hasMore: boolean,
    // filters
    view: ArticleView,
    order: SortOrder,
    sort: ArticleSortFields,
    search: string,
    _inited: boolean,
    type: ArticleType
}