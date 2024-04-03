import { Response, Request, NextFunction } from 'express';
import BaseController from '../BaseController';
import LastUsedRepository from '../../repositories/LastUsed';
import { authenticationMiddleWare } from '../../helpers/Authorization';

export default class LastUsedController extends BaseController {
  protected lastUsed;

  constructor() {
    super('/last-used');
    this.lastUsed = new LastUsedRepository();
  }

  initializeRoutes() {
    this.router.post(
      '/reset',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.resetLastUsed(req, res)
    );
    this.router.get(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.getLastUsed(req, res)
    );
  }

  async getLastUsed(req: Request, res: Response) {
    try {
      const _res = await this.lastUsed.getOne({});
      res.json(_res);
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }

  async resetLastUsed(req: Request, res: Response) {
    try {
      await this.lastUsed.delete({});
      await this.lastUsed.createOne({ users: [] });
      res.json({ msg: 'Last Used Reset Done' });
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }
}
