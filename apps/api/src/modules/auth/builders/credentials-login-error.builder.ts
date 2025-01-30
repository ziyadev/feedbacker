import { AbstractErrorsBuilder } from '@/common/builders/abstruct-errors.builder';
import {
  CredentialsLoginError,
  CredentialsLoginErrorCode,
} from '../models/credentials-login.model';

export class CredentialsLoginErrorBuilder extends AbstractErrorsBuilder<
  CredentialsLoginError,
  CredentialsLoginErrorCode
> {
  setInvalidCredentialsError(message?: string) {
    this.addError({
      code: CredentialsLoginErrorCode.INVALID_CREDENTIALS,
      message: message || 'Invalid credentials',
    });
    return this;
  }
}
