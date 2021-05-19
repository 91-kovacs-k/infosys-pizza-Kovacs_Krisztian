import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { connectionOptions } from '../ormconfig';
import express from 'express';
import { getRouter } from './routes';

createConnection(connectionOptions)
  .then(async (conn) => {
    await conn.runMigrations();
    const app = express();

    app.use(express.json());
    app.use('/api', getRouter());

    app.listen(3000, () => {
      console.log('Backend is listening to port 3000.');
    });
  })
  .catch((error) => console.log(error));
