const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({ target: 'http://localhost:3001' });

module.exports = {
  mount: {
    build: "/",
    src: "/"
  },
  routes: [
    {
      src: '/api/.*',
      dest: (req, res) => proxy.web(req, res),
    },
    { match: 'routes', src: '.*', dest: '/index.html' }
  ],
}
