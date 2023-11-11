const Hapi = require('@hapi/hapi');
const routes = require('./routes');

// Web Server
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Server Routes
  server.route(routes);

  // Menjalankan Server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
