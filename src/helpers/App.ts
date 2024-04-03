import express from 'express';
// @ts-ignore
import cors from 'cors';
import * as bodyParser from 'body-parser';
import Logger from './Logger';
import { ControllerType } from '../types';

class App {
  public app: express.Application;
  public port: string;
  public path: string;
  public appName: string;

  constructor(controllers: any, port: string, path: string, appName: string) {
    this.app = express();
    this.port = port;
    this.path = path;
    this.appName = appName;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private loggerMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
    console.log(`${request.method} ${request.path}`);
    next();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(this.loggerMiddleware);
    this.app.use(cors());
  }

  private initializeControllers(controllers: ControllerType[]) {
    controllers.forEach((controller) => {
      this.app.use(`${this.path}${controller.path}`, controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => Logger.applicationLogger(`${this.appName} listening on the port ${this.port}`));
  }
}

export default App;