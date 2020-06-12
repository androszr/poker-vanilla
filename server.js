const jsonServer = require('json-server'); // eslint-disable-line no-undef
const server = jsonServer.create();
const router = jsonServer.router('dist/db/app.json');
const middlewares = jsonServer.defaults({
  static: 'dist',
  noCors: true
});
const port = process.env.PORT || 3131; // eslint-disable-line no-undef

server.use(middlewares);
server.use(router);

server.listen(port);