import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import BaseController from '../BaseController';
import Admin from '../../repositories/AdminRepository';
import { decrypt, encrypt } from '../../helpers/Encryption';
import { logInSchema, signUpSchema } from '../../schemas';
import { authenticationMiddleWare } from '../../helpers/Authorization';

export default class AuthController extends BaseController {
  protected admin;

  constructor() {
    super('/auth');
    this.admin = new Admin();
  }

  initializeRoutes() {
    this.router.post(
      '/sign-up',
      (req: Request, res: Response) => this.signUp(req, res)
    );
    this.router.get(
      '/check-token',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.checkToken(req, res)
    );
    this.router.put(
      '/update-url',
      (req: Request, res: Response, next: NextFunction) => authenticationMiddleWare(req, res, next),
      (req: Request, res: Response) => this.updateUrl(req, res)
    );
    this.router.post(
      '/sign-in',
      (req: Request, res: Response) => this.signIn(req, res)
    );
  }

  async checkToken(req: Request, res: Response) {
    res.json({ status: true, user: req.params.user });
  }

  async signIn(req: Request, res: Response) {
    try {
      const checkRes = await this.admin.validateData(logInSchema, req.body);
      if (checkRes.err) {
        throw new Error(checkRes.msg);
      }
    } catch (err) {
      res.status(422).json({ error: err.message, status: false, });
      return;
    }

    try {
      const user = await this.admin.getOne({
        username: req.body.username,
      });
      if (!user) {
        throw new Error('Username is not valid');
      }
      const decrypted = decrypt(user.password);
      if (decrypted !== req.body.password) {
        throw new Error('Password is not valid');
      }

      const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET, { expiresIn: '10h' });
      res.json({ token, user: this.admin.getFilteredData(user), status: true, });
    } catch (err) {
      res.status(400).json({ error: err.message, status: false, });
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const validateData = await this.admin.validateData(signUpSchema, req.body);
      if (validateData.err) {
        throw new Error(validateData.msg);
      }
    } catch (err) {
      res.status(422).json({ error: err.message, status: false, });
      return;
    }

    try {
      const password = encrypt(req.body.password);
      const u = await this.admin.createOne({ ...req.body, password });
      const user = await this.admin.getOne({ email: req.body.email, password });
      const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET, { expiresIn: '10h' });
      res.json({ token, user: u, status: true });
    } catch (err) {
      res.status(400).json({ error: err.message, status: false });
    }
  }

  async updateUrl(req: Request, res: Response) {
    const { url } = req.body;

    // @ts-ignore
    const _r = await this.admin.update({ email: req.params.user.email }, { url });
    res.json(_r);
  }
}
