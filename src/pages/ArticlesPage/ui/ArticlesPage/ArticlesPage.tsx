import { memo } from 'react'
import cls from './ArticlesPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Article, ArticleList, ArticleView } from 'entities/Article'

interface ArticlesPageProps {
    className?: string
}

const article = {
      "id": "1",
      "title": "Javascript news",
      "subtitle": "Что нового в JS за 2026 год",
      "img": "https://thumbs.dreamstime.com/b/javascript-208329455.jpg",
      "views": 1022,
      "createdAt": "26.02.2026",
      "user": {
        id: '1',
        username: 'Sergey K',
        avatar: 'https://doprof.ru/upload/medialibrary/a5a/programmist.jpg'
      },
      "type": [
        "IT"
      ],
      "blocks": [
        {
          "id": "1",
          "type": "TEXT",
          "title": "Заголовок этого блока",
          "paragraphs": [
            "Программа, которую по традиции называют Hello, World!, очень просто. Она выводит куда надпись Hello, World!",
            "JavaScript - это язык, программы на котором можно выполнять в разных средах. В нашем случае - это браузер",
            "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном ..."
          ]
        },
        {
          "id": "2",
          "type": "CODE",
          "code": "const path = require('path');\n\nconst server = jsonSever.create();\n\nconst .."
        },
        {
          "id": "3",
          "type": "IMAGE",
          "src": "",
          "title": "Рисунок 1 - скриншот сайта"
        },
        {
          "id": "4",
          "type": "CODE",
          "code": "<!DOCTYPE html>\n<htmk>\n <body>\n <p id=\"hello\"></p>"
        },
        {
          "id": "5",
          "type": "TEXT",
          "title": "Заголовок этого блока",
          "paragraphs": [
            "Программа, которую по традиции называют Hello, World!, очень просто. Она выводит куда надпись Hello, World!",
            "Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном ..."
          ]
        }
      ]
    } as Article

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    return(
        <div className={classNames(cls.articlesPage, {}, [className])}>
            <ArticleList view={ArticleView.LIST} articles={new Array(16)
                .fill(0)
                .map((item, index) => ({
                    ...article,
                    id: String(index)
                }))
            }/>
        </div>
    )
}

export default memo(ArticlesPage)