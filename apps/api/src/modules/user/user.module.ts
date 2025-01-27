import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AccountService } from './services/account.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, AccountService, UserResolver],
  exports: [UserService, AccountService],
})
export class UserModule {}
