const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 提供靜態文件服務
app.use(express.static(__dirname));

// 主頁 - 列出所有策略圖表
app.get('/', (req, res) => {
  const files = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.html'))
    .map(file => ({
      name: file.replace('.html', ''),
      url: `/${file}`
    }));

  const html = `
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>交易策略圖表集合</title>
      <script src="/language.js"></script>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        h1 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 30px;
        }
        .file-list {
          list-style: none;
          padding: 0;
        }
        .file-item {
          margin: 15px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }
        .file-item a {
          color: #2c3e50;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
        }
        .file-item a:hover {
          color: #3498db;
        }
        .lang-switch {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .lang-switch:hover {
          background: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        @media (max-width: 768px) {
          .lang-switch {
            top: 10px;
            right: 10px;
            padding: 8px 16px;
            font-size: 12px;
          }
        }
      </style>
    </head>
    <body>
      <button class="lang-switch" id="lang-switch" onclick="toggleLanguage()">English</button>
      <div class="container">
        <h1 data-i18n="home-title">📊 交易策略圖表集合</h1>
        <ul class="file-list">
          ${files.map(file => `
            <li class="file-item">
              <a href="${file.url}">${file.name}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    </body>
    </html>
  `;
  
  res.send(html);
});

// 健康檢查端點
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`服務器運行在端口 ${PORT}`);
  console.log(`訪問 http://localhost:${PORT} 查看策略圖表`);
});

