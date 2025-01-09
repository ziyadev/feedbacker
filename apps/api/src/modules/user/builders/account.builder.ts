import { AccountEntity } from '../entities/account.entity';

export class AccountBuilder {
  private account: AccountEntity;

  constructor() {
    this.account = {} as AccountEntity;
  }

  setUser(userId: string): AccountBuilder {
    this.account.userId = userId;
    return this;
  }

  setProvider(provider: string, providerAccountId: string): AccountBuilder {
    this.account.provider = provider;
    this.account.providerAccountId = providerAccountId;
    return this;
  }

  build(): AccountEntity {
    return this.account;
  }
}
