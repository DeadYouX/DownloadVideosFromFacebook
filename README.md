# Facebook Video Downloader

Этот Node.js скрипт позволяет скачивать видео с Facebook, используя сторонний сервис (v3.fdownloader.net). Скрипт автоматически получает ссылку на скачивание и сохраняет видео в локальную папку.

## Описание

Скрипт выполняет следующие действия:

1.  **Получение ссылки на скачивание:**
    *   Отправляет POST-запрос на `v3.fdownloader.net` с URL видео из Facebook.
    *   Использует `cheerio` для парсинга HTML ответа и находит ссылку для скачивания видео.
2.  **Скачивание видео:**
    *   Отправляет GET-запрос по полученной ссылке для скачивания видео.
    *   Создает папку `videos` (если она не существует) в директории скрипта.
    *   Сохраняет скачанное видео в файл с уникальным именем (например, `video_1.mp4`, `video_2.mp4` и т.д.) в папку `videos`.

## Требования

Для работы скрипта необходимы следующие компоненты:

*   **Node.js 16+**
*   **npm** (менеджер пакетов Node.js)
*   **Библиотеки Node.js:**
    *   `axios` (для HTTP-запросов)
    *   `fs` (для работы с файловой системой)
    *   `path` (для работы с путями файлов)
    *   `qs` (для кодирования данных в формате query string)
    *   `cheerio` (для парсинга HTML)

    Вы можете установить необходимые библиотеки, используя `npm`:
    ```bash
    npm install axios fs path qs cheerio
    ```

## Использование

1.  **Клонируйте** репозиторий или скопируйте файл скрипта (`.js`).
    ```bash
    git clone <URL вашего репозитория>
    ```
2.  **Перейдите** в директорию проекта.
    ```bash
    cd <название_вашей_папки_с_проектом>
    ```
3.  **Установите** необходимые библиотеки (см. раздел "Требования").
    ```bash
    npm install axios fs path qs cheerio
    ```
4.  **Измените** значение `videoUrl` в функции `main()` на URL нужного вам видео с Facebook.
5.  **Запустите** скрипт:
    ```bash
    node <имя_вашего_скрипта>.js
    ```
6.  **Проверьте** папку `videos`, где будет находиться скачанное видео.
