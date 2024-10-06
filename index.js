const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Вказуємо статичну папку
app.use('/static', express.static(path.join(__dirname, 'static')));

// Налаштування EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Рендеринг index.ejs за запитом на кореневий шлях
app.get('/', (req, res) => {
    res.render('index');
});

// Запускаємо сервер
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
