import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import CommentController from '../controllers/CommentController';
import LastUsedController from '../controllers/LastUsedController';
import App from '../helpers/App';

export default function apiLoader() {
  const app = new App(
    [
      new AuthController(),
      new UserController(),
      new CommentController(),
      new LastUsedController(),
    ],
    process.env.API_PORT || process.env.PORT,
    '/api',
    'API',
  );

  app.listen();
}

