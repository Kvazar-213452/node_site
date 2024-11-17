const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 3000;

let time_del = 0;

const generateUniqueFileName = (originalName, destination) => {
    let fileName = originalName;
    let filePath = path.join(destination, fileName);
    let counter = 1;

    while (fs.existsSync(filePath)) {
        const extname = path.extname(fileName);
        const basename = path.basename(fileName, extname);
        fileName = `${basename}_${counter}${extname}`;
        filePath = path.join(destination, fileName);
        counter++;
    }

    return fileName;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'static', 'file'));
    },
    filename: (req, file, cb) => {
        const uniqueFileName = generateUniqueFileName(file.originalname, path.join(__dirname, 'static', 'file'));
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }).single('file');

app.use('/static', express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Не вдалося завантажити файл', error: err.message });
        }

        res.json({ success: true, message: 'Файл успішно завантажено', fileName: req.file.filename });
    });
});

const clearFileFolder = (folderPath) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error("Не вдалося прочитати вміст папки:", err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Не вдалося видалити файл:", err);
                } else {
                    console.log(`Файл ${file} видалено.`);
                }
            });
        });
    });
};

app.post('/time', (req, res) => {
    res.json({ time: time_del });
});

setInterval(() => {
    const fileDir = path.join(__dirname, 'static', 'file');
    clearFileFolder(fileDir);
}, 1800000);

function func_time_del() {
    setInterval(() => {
        if (time_del === 1800) {
            time_del = 0;
        }

        time_del += 1;
    }, 1000);
}

func_time_del();

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});