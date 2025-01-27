import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async sendLoginEmail(@Args('email') email: string) {
    return this.authService.sendLoginEmail(email);
  }
}
