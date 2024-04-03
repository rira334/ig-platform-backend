import { Response, Request, NextFunction } from 'express';
import BaseController from '../BaseController';
import User from '../../repositories/UserRepository';
import Comment from '../../repositories/CommentRepository';
import LastUsed from '../../repositories/LastUsed';
import { authenticationMiddleWare } from '../../helpers/Authorization';
import axios from 'axios';

export default class CommentController extends BaseController {
  protected user;
  protected comment;
  protected lastUsed;

  constructor() {
    super('/comment');
    this.user = new User();
    this.comment = new Comment();
    this.lastUsed = new LastUsed();
  }

  initializeRoutes() {
    this.router.get(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.getComments(req, res)
    );
    this.router.post(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.createComment(req, res)
    );
    this.router.put(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.updateComment(req, res)
    );
    this.router.post(
      '/post-comments',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.addComments(req, res)
    );
    this.router.delete(
      '/',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.deleteComment(req, res)
    );
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const other: any = req.body;

      const t = await this.comment.delete({ _id: other._id });

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

  async updateComment(req: Request, res: Response) {
    try {
      const t = await this.comment.update({ _id: req.body._id }, req.body);

      if (t) {
        const updatedComment = { ...req.body };
        res.status(200).json({ status: true, msg: 'Updated successfully', data: updatedComment });
        return;
      }
      throw new Error('Error Occurred');
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }

  async createComment(req: Request, res: Response) {
    try {
      const user = await this.comment.createOne(req.body);
      res.json({ status: true, user });
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }

  async getComments(req: Request, res: Response) {
    try {
      const users = await this.comment.getAll();
      res.json(users);
    } catch (e) {
      res.status(400).json({ status: false, msg: e.message });
    }
  }

  async addComments(req: Request, res: Response) {
    res.json({ status: true });

    const real = req.body.real;
    const fake = req.body.fake.map((f: any) => ({
      ...f,
      comments: [1, 2, 3, 4, 5].map(() => '🔥🔥🔥')
    }));

    const usersLength = (await this.user.getAll()).length;
    const _lastUsed = await this.lastUsed.getOne({});
    const data = { real, fake }

    if (_lastUsed) {
      const _users = [
        ..._lastUsed.users,
        ...(real.map((r: any) => r.username)),
        ...(fake.map((r: any) => r.username)),
      ];

      if (_users.length >= usersLength) {
        await this.lastUsed.update({}, { users: [] });
      } else {
        await this.lastUsed.update({}, { users: _users });
      }
    }

    try {
      await axios.post('/add-comment', data, {
        data,
        // @ts-ignore
        baseURL: req.params.user.url,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
