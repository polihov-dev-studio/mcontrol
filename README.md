# MControl — статический сайт для GitHub Pages

Готовый многостраничный сайт по приложенному дизайну: главная, возможности, тарифы, решения, интеграции, FAQ и форма заявки.

## Как опубликовать на GitHub Pages

1. Создайте репозиторий на GitHub.
2. Загрузите в него все файлы из этой папки: `index.html`, остальные `.html`, папку `assets` и `README.md`.
3. Откройте **Settings → Pages**.
4. В блоке **Build and deployment** выберите **Deploy from a branch**.
5. Выберите ветку `main` и папку `/root`, затем сохраните.
6. Через 1–3 минуты сайт будет доступен по адресу GitHub Pages.

## Форма заявки

Форма заявки уже подключена к Yandex Cloud Function:

```text
https://functions.yandexcloud.net/d4el3kuenb92272k0ql3
```

Адрес endpoint указан в файле `assets/js/main.js` в переменной `FORM_ENDPOINT`. При отправке форма делает `POST`-запрос с JSON-полями `name`, `company`, `phone`, `email`, `comment`.

Если будете менять Cloud Function, замените только значение `FORM_ENDPOINT`.

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


## Заменяемые файлы

Теперь логотипы, иконки и изображения вынесены в отдельные файлы. Менять можно без правки HTML-структуры:

- `assets/img/logo/logo-full.svg` — основной логотип в шапке и футере
- `assets/img/logo/logo-mark.svg` — знак логотипа
- `assets/img/icons/` — все иконки сайта
- `assets/img/mockups/hero-dashboard.svg` — большой экран на первом экране
- `assets/img/mockups/mobile-screen.svg` — изображение внутри телефона в блоке «Управляйте бизнесом из любой точки»
- `assets/img/mockups/features-monitor.svg` — экран монитора на странице «Возможности»
- `assets/img/stores/` — иконки App Store / Google Play
- `assets/img/socials/` — иконки соцсетей

Если хотите заменить картинку в телефоне или в главном экране — просто подмените соответствующий SVG/PNG файлом с тем же именем.
