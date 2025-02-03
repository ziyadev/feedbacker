import { UserSessionData } from '@/common/config/sessoin.config';
import { User } from '@/common/decorators/user.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../auth/decorator/auth.decorator';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UserMapper } from './mappers/user.mapper';
import { CreateUserProfileModel } from './models/create-user-profile.model';
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
    const userEntity = await this.userService.findById({ id: user.id });
    return UserMapper.toModel(userEntity);
  }

  @Auth()
  @Mutation(() => CreateUserProfileModel)
  async createUserProfile(
    @User() user: UserSessionData,
    @Args('input') input: CreateUserProfileDto
  ): Promise<CreateUserProfileModel> {
    return this.userService.handleCreateUserProfile(user.id, input);
  }
}
