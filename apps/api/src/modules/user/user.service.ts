import { MutateResultFactory } from '@/common/builders/mutate-result.builder';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserProfileRepository } from '../database/repositories/user-profile.repository';
import { UserRepository } from '../database/repositories/user.repository';
import { AccountBuilder } from './builders/account.builder';
import { CreateUserProfileErrorBuilder } from './builders/create-user-profile-error.builder';
import { UserBuilder } from './builders/user.builder';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { CreateUserWithAccountDto } from './dto/create-user-with-account.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserProfileModel } from './models/create-user-profile.model';
import { AccountService } from './services/account.service';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly accountService: AccountService
  ) {}

  async findById({ id }: { id: string }): Promise<UserEntity> {
    return await this.userRepository.findUnique({
      where: {
        id,
      },
    });
  }
  async findByEmail({ email }: { email: string }): Promise<UserEntity> {
    return await this.userRepository.findFirst({
      where: {
        email,
      },
    });
  }

  async findByAccountProviderId({
    providerAccountId,
  }: {
    providerAccountId: string;
  }): Promise<UserEntity> {
    const account = await this.accountService.findByPrviderId({
      providerAccountId,
    });
    if (!account) return null;
    return this.findById({
      id: account.userId,
    });
  }
  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserBuilder()
      .setEmail(userDto.email)
      .setName(userDto.name)
      .setAvatar(userDto.avatar)
      .setPassword(userDto.hashedPassword)
      .build();
    return await this.userRepository.create({
      data: user,
    });
  }
  async createWithProvider({
    email,
    avatar,
    name,
    emailVerified,
    provider,
    providerAccountId,
  }: CreateUserWithAccountDto): Promise<UserEntity> {
    try {
      // Build new user object with provided details
      const _user = new UserBuilder()
        .setAvatar(avatar)
        .setEmail(email, emailVerified)
        .setName(name)
        .build();

      // Create the user in the database
      const createdUser = await this.userRepository.create({
        data: _user,
      });

      // Build provider account object linked to created user
      const _account = new AccountBuilder()
        .setUser(createdUser.id)
        .setProvider(provider, providerAccountId)
        .build();

      // Create the provider account in the database
      await this.accountService.create(_account);

      return createdUser;
    } catch (error) {
      throw new Error(`Failed to create user with provider: ${error.message}`);
    }
  }
  async update(userId: string, userDto: UpdateUserDto): Promise<UserEntity> {
    const user = new UserBuilder()
      .setEmail(userDto.email)
      .setName(userDto.name)
      .setAvatar(userDto.avatar)
      .build();
    return await this.userRepository.update({
      where: {
        id: userId,
      },
      data: user,
    });
  }

  async handleCreateUserProfile(
    userId: string,
    userProfileDto: CreateUserProfileDto
  ): Promise<CreateUserProfileModel> {
    try {
      const errors = new CreateUserProfileErrorBuilder();
      const user = await this.userProfileRepository.findUnique({
        where: {
          userId,
        },
      });
      this.logger.log(user);
      if (user) {
        errors.setProfileAlreadyExists();
        return MutateResultFactory.err({
          profile: null,
          errors: errors.build(),
        });
      }
      const profile = await this.userProfileRepository.create({
        data: {
          teamSize: userProfileDto.teamSize,
          companyKind: userProfileDto.companyKind,
          role: userProfileDto.role,
          country: userProfileDto.country,
          userId,
        },
      });
      return MutateResultFactory.ok({
        profile,
        errors: errors.build(),
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
