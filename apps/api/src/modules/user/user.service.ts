import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserBuilder } from './builders/user.builder';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../database/repositories/user.repository';
import { AccountService } from './services/account.service';
import { CreateUserWithAccountDto } from './dto/create-user-with-account.dto';
import { AccountBuilder } from './builders/account.builder';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
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
    return await this.userRepository.findUnique({
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
}
