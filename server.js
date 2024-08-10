const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const querystring = require('querystring');

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

const server = http.createServer((req, res) => 
    {
    if (req.method === 'POST' && req.url === '/send') 
        {
        let body = '';
        req.on('data', chunk => 
        {
            body += chunk.toString();
        });

        req.on('end', () => 
            {
            const parsedBody = querystring.parse(body);
            const { name, email, message } = parsedBody;

            // Nodemailer configuration
            let transporter = nodemailer.createTransport(
                {
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'tvildiani2001@outlook.com', // Your Outlook email address
                    pass: '****', // Your Outlook email password
                },
            });

            // Email options
            const mailOptions = 
            {
                from: '"Chxikvia.tech" <tvildiani2001@outlook.com>',
                to: 'tvildiani2001@gmail.com',
                subject: `Message from ${name}`,
                text: `You received a message from ${name} (${email}): ${message}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) 
                {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('An error occurred while sending the email.');
                    return console.log('Error:', error);
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('Message sent successfully!');
                console.log('Message sent:', info.messageId);
            });
        });

    } 
    else 
    {
        let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => 
            {
            if (err) 
                {
                if (err.code === 'ENOENT') 
                {
                    fs.readFile(path.join(__dirname, '404.html'), (error, content404) => 
                    {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content404, 'utf-8');
                    });
                } 
                else 
                {
                    res.writeHead(500);
                    res.end(`Sorry, check with the site admin for error: ${err.code} ..\n`);
                }
            } 
            else 
            {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
