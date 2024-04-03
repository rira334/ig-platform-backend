import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AdminRepository from '../repositories/AdminRepository';

export function checkBearerToken(req: Request) {
  const bearer = req.header('Authorization');

  if (bearer) {
    const token = bearer.split(' ')[1];
    if (token) {
      return token;
    }
  }
  return null;
}

export async function userAuthorization(req: Request, user: any): Promise<any> {
  const token = checkBearerToken(req);
  let data: any = null;

  if (token) {
    await jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {

      if (err) {
        return null;
      }

      const u = await user.getOne({ _id: decoded._doc._id });

      if (u) {
        data = user.getFilteredData(u);
      }
    });
  }

  return data;
}

export async function authenticationMiddleWare(req: Request, res: Response, next: NextFunction) {
  const U = new AdminRepository();
  const user = await userAuthorization(req, U);

  if (user) {
    req.params.user = user;
    next();
    return;
  }
  res.status(401).json({ msg: 'User is not authorized', status: false });
}
