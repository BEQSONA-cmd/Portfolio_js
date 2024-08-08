const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    // Build the file path
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Extract the file extension
    const extname = String(path.extname(filePath)).toLowerCase();

    // Determine the content type based on the file extension
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read the file from the file system
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success: serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(8080, () => {
    console.log('Server running at http://54.167.106.126:8080');
});

