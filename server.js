const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.ttf': 'application/font-sfnt',
    '.eot': 'application/vnd.ms-fontobject',
};

// Create the server
const server = http.createServer((req, res) => {
    // Set the file path to the requested URL, or default to 'index.html' if root is requested
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Get the file extension
    const extname = String(path.extname(filePath)).toLowerCase();

    // Get the corresponding MIME type or default to 'application/octet-stream'
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Check if the requested file exists
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // If the file is not found, serve a 404 page
                fs.readFile(path.join(__dirname, '404.html'), (error, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404, 'utf-8');
                });
            } else {
                // If there is a server error, respond with 500
                res.writeHead(500);
                res.end(`Sorry, check with the site admin for error: ${err.code} ..\n`);
            }
        } else {
            // If the file is found, serve it with the correct content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
