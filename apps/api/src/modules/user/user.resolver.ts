import { UserSessionData } from '@/common/config/sessoin.config';
import { User } from '@/common/decorators/user.decorator';
import { Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorator/auth.decorator';
import { UserMapper } from './mappers/user.mapper';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Query(() => UserModel, {
    description: 'Get the currently logged in user',
  })
  async user(@User() user: UserSessionData): Promise<UserModel> {
    console.log(user);
    const userEntity = await this.userService.findById({ id: user.id });
    return UserMapper.toModel(userEntity);
  }
}
