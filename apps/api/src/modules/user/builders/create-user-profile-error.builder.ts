import { AbstractErrorsBuilder } from '@/common/builders/abstruct-errors.builder';
import {
  CreateUserProfileError,
  CreateUserProfileErrorCode,
} from '../models/create-user-profile.model';

export class CreateUserProfileErrorBuilder extends AbstractErrorsBuilder<
  CreateUserProfileError,
  CreateUserProfileErrorCode
> {
  setProfileAlreadyExists(message?: string) {
    this.addError({
      code: CreateUserProfileErrorCode.ALREADY_EXISTS,
      message: message || 'Already profile created',
    });
    return this;
  }
}
