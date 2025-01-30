import { AbstractErrorsBuilder } from '@/common/builders/abstruct-errors.builder';
import {
  SendResetPasswordEmailError,
  SendResetPasswordEmailErrorCode,
} from '../models/send-reset-password-email.model';

export class SendResetPasswordEmailErrorBuilder extends AbstractErrorsBuilder<
  SendResetPasswordEmailError,
  SendResetPasswordEmailErrorCode
> {
  setEmailNotFoundError(message?: string) {
    this.addError({
      code: SendResetPasswordEmailErrorCode.EMAIL_NOT_FOUND,
      message: message || 'Email not found',
    });
    return this;
  }
  setMaxResetAttemptsExceededError(message?: string) {
    this.addError({
      code: SendResetPasswordEmailErrorCode.MAX_RESET_ATTEMPTS_EXCEEDED,
      message: message || 'Max reset attempts exceeded',
    });
  }
}
