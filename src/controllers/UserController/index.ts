import { Response, Request, NextFunction } from 'express';
import BaseController from '../BaseController';
import User from '../../repositories/UserRepository';
import { authenticationMiddleWare } from '../../helpers/Authorization';
import { getSchemaObject, signUpSchema } from '../../schemas';
import { objectsToUpdate } from './helper';

export default class UserController extends BaseController {
  protected user;

  constructor() {
    super('/user');
    this.user = new User();
  }

  initializeRoutes() {
    this.router.get(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.getUsers(req, res)
    );
    this.router.post(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.createUser(req, res)
    );
    this.router.put(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.updateUser(req, res)
    );
    this.router.delete(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.deleteUser(req, res)
    );
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user: any = req.params.user;
      const other: any = req.body;
      const updated: any = {};
      const keys: string[] = [];

      objectsToUpdate.forEach((k) => {
        if (typeof other[k] !== 'undefined') {
          keys.push(k);
          updated[k] = other[k];
        }
      });

      const schema = getSchemaObject(keys, signUpSchema);

      const validateData = await this.user.validateData(schema, updated);
      if (validateData.err) {
        throw new Error(validateData.msg);
      }

      const t = await this.user.update({ _id: other._id }, updated);

      if (t) {
        const updatedUser = { ...user, ...updated };
        res.status(200).json({ status: true, msg: 'Updated successfully', data: updatedUser });
        return;
      }
      throw new Error('Error Occurred');
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const other: any = req.body;

      const t = await this.user.delete({ _id: other._id });

      if (t) {
        const updatedUser = { ...other };
        res.status(200).json({ status: true, msg: 'Deleted successfully', data: updatedUser });
        return;
      }
      throw new Error('Error Occurred');
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.user.createOne(req.body);
      res.json({ status: true, user });
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.user.getAll();
      res.json(users);
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }
}
