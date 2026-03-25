import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleCodeBlockComponent.module.scss'
import { ArticleCodeBlock } from '../../modal/types/article'
import { Code } from 'shared/ui/Code/Code'

interface ArticleCodeBlockComponentProps {
    className?: string,
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(({ className, block }: ArticleCodeBlockComponentProps) => {
    return(
        <div className={classNames(cls.articleCodeBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    )
})

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent'
