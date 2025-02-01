import { AbstractErrorsBuilder } from '@/common/builders/abstruct-errors.builder';
import {
  CreateWorkspaceError,
  CreateWorkspaceErrorCode,
} from '../model/create-workspace.model';

export class CreateWorkspaceErrorBuilder extends AbstractErrorsBuilder<
  CreateWorkspaceError,
  CreateWorkspaceErrorCode
> {
  setSlugAlreadyTaken(message?: string): CreateWorkspaceErrorBuilder {
    this.addError({
      code: CreateWorkspaceErrorCode.SLUG_ALREADY_TAKEN,
      message: message || 'Slug is already taken',
    });
    return this;
  }
}
