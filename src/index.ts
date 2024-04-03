import { bootstrapMicroframework } from 'microframework';
import dotenv from 'dotenv';
import Logger from './helpers/Logger';
import apiLoader from './loaders/apiLoader';
import databaseLoader from './loaders/databaseLoader';

dotenv.config();

bootstrapMicroframework({
  loaders: [
    databaseLoader,
    apiLoader,
  ],
})
  .then(() => Logger.microframeworkLogger('Application is up and running.'))
  .catch(error => Logger.microframeworkLogger(`Application is crashed: ${error}`));
