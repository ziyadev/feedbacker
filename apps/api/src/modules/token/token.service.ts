import { Injectable } from '@nestjs/common';
import { IToken } from './token.interface';

@Injectable()
export class TokenService {
  get userLoginToken(): IToken {
    return {
      generate: async ({ userId }: { userId: string }) => {
        try {
          return '';
        } catch {
          throw new Error('Something went wrong');
        }
      },
      validate: async (token) => {
        return {};
      },
    };
  }
}
