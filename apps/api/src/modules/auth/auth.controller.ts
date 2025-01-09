import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guard/google.guard';
import { GithubOAuthGuard } from './guard/github.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  google() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  googleCallback(@Request() req) {
    console.log(req.user);
  }

  @UseGuards(GithubOAuthGuard)
  @Get('github')
  github() {
    return 'github';
  }

  @UseGuards(GithubOAuthGuard)
  @Get('github/callback')
  githubCallback(@Request() req) {
    console.log(req.user);
  }
}
