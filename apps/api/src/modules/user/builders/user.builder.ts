import { UserEntity } from '../entities/user.entity';

export class UserBuilder {
  private user: UserEntity;

  constructor() {
    this.user = {} as UserEntity;
  }

  setEmail(email: string, emailVerified?: boolean): UserBuilder {
    this.user.emailVerified = emailVerified || false;
    this.user.email = email;
    return this;
  }

  setName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  setAvatar(url: string): UserBuilder {
    this.user.avatar = url;
    return this;
  }

  build(): UserEntity {
    return this.user;
  }
}
