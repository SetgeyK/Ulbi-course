import { Article } from '../../../src/entities/Article'

const defaultArticle = {
    "title": "Testing Article",
    "subtitle": "Что нового в Python за 2026 год",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1280px-Python-logo-notext.svg.png",
    "views": 1022,
    "createdAt": "17.03.2022",
    "userId": "1",
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
        }
    ]
}

export const createArticle = (article?: Article) => {
        return cy.request({
        method: 'POST',
        url: `http://localhost:8000/articles`,
        headers: {Authorization: 'wow'},
        body: article ?? defaultArticle
    }).then(resp => resp.body)
}

export const removeArticle = (articleId: string) => {
        return cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/articles/${articleId}`,
        headers: {Authorization: 'wow'},
    })
}

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>
            removeArticle(articleId: string): Chainable<void>
        }
    }
}