import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AccountService } from './services/account.service';

@Module({
  providers: [UserService, AccountService],
  exports: [UserService, AccountService],
})
export class UserModule {}
