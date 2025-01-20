import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OauthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const redirectUri = req.query.redirectUri;
    if (!redirectUri) return next();
    res.cookie('redirectUri', redirectUri, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    next();
  }
}
