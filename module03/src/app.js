import express from 'express';
import path from 'path';
import routes from './routes';

// Execute the database configuration.
// No need to access the returned data.
import './database/index';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    // Static route for the avatars
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
