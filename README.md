# MANTROVA Control — статический сайт для GitHub Pages

Готовый многостраничный сайт по приложенному дизайну: главная, возможности, тарифы, решения, интеграции, FAQ и форма заявки.

## Как опубликовать на GitHub Pages

1. Создайте репозиторий на GitHub.
2. Загрузите в него все файлы из этой папки: `index.html`, остальные `.html`, папку `assets` и `README.md`.
3. Откройте **Settings → Pages**.
4. В блоке **Build and deployment** выберите **Deploy from a branch**.
5. Выберите ветку `main` и папку `/root`, затем сохраните.
6. Через 1–3 минуты сайт будет доступен по адресу GitHub Pages.

## Форма заявки

Сейчас форма работает без backend: при отправке показывает уведомление и сохраняет заявку в `localStorage` браузера. Для реального сбора заявок подключите один из вариантов:

- Formspree / Getform / Basin;
- Telegram-бот через serverless endpoint;
- собственный API.

В файле `assets/js/main.js` найдите обработчик `[data-demo-form]` и замените сохранение в `localStorage` на `fetch()` к вашему endpoint.

## Структура

```text
index.html
features.html
pricing.html
solutions.html
integrations.html
faq.html
404.html
assets/
  css/style.css
  js/main.js
  img/favicon.svg
```

## Настройка бренда

Цвета и радиусы вынесены в CSS-переменные в начале `assets/css/style.css`. Логотип сделан на CSS и SVG favicon, поэтому сайт не зависит от сторонних изображений.
