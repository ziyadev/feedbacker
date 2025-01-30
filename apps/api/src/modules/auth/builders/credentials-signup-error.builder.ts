import { AbstractErrorsBuilder } from '@/common/builders/abstruct-errors.builder';
import {
  CredentialsSignUpError,
  CredentialsSignUpErrorCode,
} from '../models/credentials-signup.model';

export class CredentialsSignUpErrorBuilder extends AbstractErrorsBuilder<
  CredentialsSignUpError,
  CredentialsSignUpErrorCode
> {
  setUserExsitsError(message?: string) {
    this.addError({
      code: CredentialsSignUpErrorCode.USER_EXISTS,
      message: message || 'User already exists',
    });
    return this;
  }
}
