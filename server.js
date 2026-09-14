const http = require('http');

const port = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'POST' && req.url === '/api/integration/sap/connectivity') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        message: 'TMS connectivity test successful'
      }));
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      service: 'TMS MuleSoft Connectivity API',
      endpoint: 'POST /api/integration/sap/connectivity'
    }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({
    success: false,
    message: 'Not Found'
  }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
