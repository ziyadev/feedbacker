import { Session } from '@/common/decorators/session.decorator';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import { Auth } from './decorator/auth.decorator';
import { GithubOAuthGuard } from './guard/github.guard';
import { GoogleOAuthGuard } from './guard/google.guard';
import { buildOauthRedirectUrl } from './utils/build-oauth-redirect-url';

@Controller('auth')
export class AuthController {
  @Auth()
  @Get('session')
  session(@Session() session: SessionData) {
    return {
      session,
    };
  }
  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  google() {
    return;
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session
  ) {
    session.user = req.user;
    res.redirect(buildOauthRedirectUrl(req));
  }
  @UseGuards(GithubOAuthGuard)
  @Get('github')
  github() {
    return;
  }

  @UseGuards(GithubOAuthGuard)
  @Get('github/callback')
  async githubCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session
  ) {
    session.user = req.user;
    res.redirect(buildOauthRedirectUrl(req));
  }

  @Post('sign-out')
  async signOut(@Req() req: Request) {
    return req.session.destroy(() => console.log('session destroyed'));
  }
}
