const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use('/static', express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const fileDir = path.join(__dirname, 'static', 'file');
    fs.readdir(fileDir, (err, files) => {
        if (err) {
            return res.status(500).send('Не вдалося отримати файли');
        }

        res.render('index', { files });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});