import express, { Router } from 'express';

export default class BaseController {
  private path: string;
  protected router: Router = express.Router();

  constructor(path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  initializeRoutes() { }
}
