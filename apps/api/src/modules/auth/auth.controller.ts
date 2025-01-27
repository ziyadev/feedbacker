import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Auth } from './decorator/auth.decorator';
import { OAuthUser } from './decorator/oauth-user.decorator';
import { OAuathUserCallbackDto } from './dto/oauth-user-callback.dto';
import { GithubOAuthGuard } from './guard/github.guard';
import { GoogleOAuthGuard } from './guard/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  google() {
    return;
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleCallback(
    @OAuthUser() user: OAuathUserCallbackDto,
    @Req()
    req: Request,
    @Res() res: Response
  ) {
    const redirectUri = req.cookies?.['redirectUri'];
    const { sessionData, redirectUrl } =
      await this.authService.handleOAuthCallback(user, redirectUri);
    req.session.user = sessionData;
    res.redirect(redirectUrl);
  }
  @UseGuards(GithubOAuthGuard)
  @Get('github')
  github() {
    return;
  }

  @UseGuards(GithubOAuthGuard)
  @Get('github/callback')
  async githubCallback(
    @OAuthUser() user: OAuathUserCallbackDto,
    @Req()
    req: Request,
    @Res() res: Response
  ) {
    const redirectUri = req.cookies?.['redirectUri'];
    const { sessionData, redirectUrl } =
      await this.authService.handleOAuthCallback(user, redirectUri);
    req.session.user = sessionData;
    res.redirect(redirectUrl);
  }
}
