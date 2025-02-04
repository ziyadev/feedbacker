import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class OauthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, nextfn: NextFunction) {
    const next = req.query.next;
    if (next) {
      res.cookie('next', next, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
    }
    nextfn();
  }
}
