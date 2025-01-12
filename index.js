const axios = require('axios');
const fs = require('fs');
const path = require('path');
const qs = require('qs');
const cheerio = require('cheerio');

async function fetchDownloadLink(videoUrl) {
  try {
    const postData = qs.stringify({
      q: videoUrl,
      lang: 'en',
    });

    const headers = {
      'authority': 'v3.fdownloader.net',
      'accept': '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'origin': 'https://fdownloader.net',
      'pragma': 'no-cache',
      'referer': 'https://fdownloader.net/',
      'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Opera GX";v="114"',
      'sec-ch-ua-mobile': '?1',
      'sec-ch-ua-platform': '"Android"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36'
    };

    const response = await axios.post(
      'https://v3.fdownloader.net/api/ajaxSearch?lang=en',
      postData,
      { headers }
    );

    const $ = cheerio.load(response.data.data);
    const downloadLink = $('a.download-link-fb').attr('href');

    if (!downloadLink) {
      throw new Error('Не удалось найти ссылку для скачивания');
    }

    return downloadLink;
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

async function downloadVideo(url, folderPath) {
  try {
    // Убедитесь, что папка существует
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Определите уникальный ID на основе существующих файлов
    const existingFiles = fs.readdirSync(folderPath);
    const ids = existingFiles
      .map(filename => parseInt(filename.match(/video_(\d+)\.mp4/)?.[1]))
      .filter(id => !isNaN(id));
    const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    const filePath = path.join(folderPath, `video_${nextId}.mp4`);

    // Скачиваем видео и сохраняем
    const videoStream = await axios({
      method: 'GET',
      url,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(filePath);
    videoStream.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Видео успешно сохранено как ${filePath}`);
        resolve(filePath);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Ошибка при скачивании видео:', error.message);
  }
}

async function main() {
  const videoUrl = 'https://www.facebook.com/100064480608713/videos/1265397674377768/';
  const downloadLink = await fetchDownloadLink(videoUrl);

  if (downloadLink) {
    await downloadVideo(downloadLink, path.resolve(__dirname, 'videos'));
  }
}

main();
