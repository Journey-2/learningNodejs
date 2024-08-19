const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable'); 

const PORT = 8085;

let fileStore = [];

function serveHTML(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

function serveJSON(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function serveImage(res, imagePath) {
    fs.readFile(imagePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - Image Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        }
    });
}

function handleFileUpload(req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, 'uploads'); 
    form.keepExtensions = true; 
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
            return;
        }

        const uploadedFile = files.file;
        if (uploadedFile) {
            fileStore.push(uploadedFile.name); 
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File uploaded successfully');
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('400 - No File Uploaded');
        }
    });
}

function serveUploadedFile(res, fileName) {
    const filePath = path.join(__dirname, 'uploads', fileName);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
            res.end(data);
        }
    });
}

http.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/index.html') {
        serveHTML(res, path.join(__dirname, 'index.html'));
    } else if (url === '/api') {
        serveJSON(res, {
            message: 'Hello, this is your JSON response!',
            timestamp: new Date(),
            status: 'Success'
        });
    } else if (url === '/image') {
        serveImage(res, path.join(__dirname, 'image.jpeg'));
    } else if (url.startsWith('/file/')) {
        const fileName = url.split('/file/')[1];
        serveUploadedFile(res, fileName);
    } else if (url === '/upload') {
        const auth = req.headers['authorization'];
        if (!auth || auth !== 'Basic ' + Buffer.from('user:pass').toString('base64')) {
            res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Secure Area"' });
            res.end('401 - Unauthorized');
            return;
        }
        if (req.method === 'POST') {
            handleFileUpload(req, res);
        } else {
            serveHTML(res, path.join(__dirname, 'upload.html'));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }

}).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
