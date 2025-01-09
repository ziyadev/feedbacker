import { Injectable } from '@nestjs/common';
import { LoginUserWithProviderDto } from './dto/login-user-with-provider.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async handleProviderLogin(
    dto: LoginUserWithProviderDto
  ): Promise<UserEntity> {
    const user = await this.findOrCreateUser(dto);
    return user;
  }

  private async findOrCreateUser(
    dto: LoginUserWithProviderDto
  ): Promise<UserEntity> {
    // Check if user exists
    let user = await this.userService.findByAccountProviderId({
      providerAccountId: dto.providerAccountId,
    });

    // Create a new user if not found
    if (!user) {
      user = await this.userService.createWithProvider(dto);
    }

    return user;
  }
}
