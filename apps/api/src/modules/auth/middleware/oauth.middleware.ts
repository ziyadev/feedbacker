import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OauthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, nextfn: NextFunction) {
    const redirectUrl = req.query.redirectUrl;
    const next = req.query.next;
    if (redirectUrl) {
      res.cookie('redirectUrl', redirectUrl, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
    }
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
