import { Injectable, Logger } from '@nestjs/common';
import { IToken } from './token.interface';
import { randomBytes } from 'node:crypto';
import { v4 as uuidv4 } from 'uuid';
import { TokenRepository } from '../database/repositories/token.repository';

@Injectable()
export class TokenService {
  private logger = new Logger(TokenService.name);
  constructor(private readonly tokenRepository: TokenRepository) {}
  get userLoginToken(): IToken {
    return {
      generate: async (userId) => {
        try {
          const token = `${uuidv4()}-${randomBytes(16).toString('hex')}`;
          await this.tokenRepository.create({
            data: {
              identifier: userId,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
            },
          });
          return token;
        } catch (e) {
          this.logger.error('Failed to generate token', e.message);
          throw new Error('Something went wrong');
        }
      },
      validate: async (token) => {
        const findToken = await this.tokenRepository.findFirst({
          where: {
            token,
          },
        });
        if (!findToken || findToken.expires < new Date()) {
          return false;
        }
        return true;
      },
    };
  }
  get userResetPasswordToken(): IToken {
    return {
      generate: async (userId) => {
        try {
          const token = `${uuidv4()}-${randomBytes(16).toString('hex')}`;
          await this.tokenRepository.create({
            data: {
              identifier: userId,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
            },
          });
          return token;
        } catch (e) {
          this.logger.error('Failed to generate token', e.message);
          throw new Error('Something went wrong');
        }
      },
      validate: async (token) => {
        const findToken = await this.tokenRepository.findFirst({
          where: {
            token,
          },
        });
        if (!findToken || findToken.expires < new Date()) {
          return false;
        }
        return true;
      },
    };
  }
  async getIdentifierByToken(token: string): Promise<string | null> {
    const _token = await this.tokenRepository.findFirst({
      where: {
        token,
      },
    });
    return _token ? _token.identifier : null;
  }
}
