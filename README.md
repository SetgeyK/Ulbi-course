# Pet Project
Веб-приложение для управления статьями и профилями пользователей, построенное по методологии **Feature Slice Design (FSD)** и базирующееся на актуальном стеке библиотек и технологий.

## 🛠️ Стек технологий
- **Core:** React 19, TypeScript 5, Redux Toolkit (RTK Query)
- **Сборка:** Vite 8, Webpack 5
- **Линтинг:** ESLint 9 (Flat Config), Stylelint, Самописный кастомные плагины (`@sj_lk/eslint-plugin-sj-plugin`)
- **Тестирование:** Jest, React Testing Library, Mocha (для линтера)

# Быстрый старт

## Требования 
- **Node.js** версии `v20.20.2` или выше

## Установка зависимостей
```
npm install
```

## Запуск проекта
```
npm run start:dev
    или
npm run start:dev:vite
```
## Доступные скрипты

- `npm run start` - Запуск frontend проекта на webpack
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack + backend
- `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run stylelint:scss` - Проверка scss файлов style линтером
- `npm run stylelint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Запуск unit тустов с jest
- `npm run prepare` - Прекоммит хуки
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

## Архитектура проекта

Проект написан в соответствии с методологией **Feature Sliced Design**:

- `app/` - Инициализация приложения (провайдеры, стили, роутинг)
- `pages/` - Компоненты страниц приложения
- `widgets/` - Самостоятельные крупные блоки (например, `Sidebar`, `Navbar`)
- `features/` - Части функционала, несущие бизнес-ценность (например, `editableProfileCard`, `profileRating`)
- `entities/` - Бизнес-сущности (например, `Article`, `User`)
- `shared/` - Переиспользуемые компоненты, хелперы, API