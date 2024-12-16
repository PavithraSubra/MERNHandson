const http = require('http');

const main = require('./main.js');

const server = http.createServer(main.handler);
server.listen(3000);