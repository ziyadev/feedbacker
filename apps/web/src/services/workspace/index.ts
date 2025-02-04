import {
  CREATE_WORKSPACE,
  IS_WORKSPACE_SLUG_VALID,
  SEND_WORKSPACE_INVITATION,
} from '@/features/workspace/api/mutations';
import {
  CreateWorkspaceDto,
  CreateWorkspaceInvitationDto,
  CreateWorkspaceMutation,
  IsWorkspaceSlugValidDto,
  IsWorkspaceSlugValidMutation,
  SendWorkspaceInvitationMutation,
} from '@/graphql/graphql';
import { MutationHookOptions, useMutation } from '@apollo/client';

const workspaceService = {
  create: {
    useMutation: (
      options?: MutationHookOptions<
        CreateWorkspaceMutation,
        { input: CreateWorkspaceDto }
      >
    ) => useMutation(CREATE_WORKSPACE, options),
  },
  isSlugUnique: {
    useMutation: (
      options?: MutationHookOptions<
        IsWorkspaceSlugValidMutation,
        { input: IsWorkspaceSlugValidDto }
      >
    ) => useMutation(IS_WORKSPACE_SLUG_VALID, options),
  },
  member: {
    invitation: {
      useMutation: (
        options?: MutationHookOptions<
          SendWorkspaceInvitationMutation,
          { input: CreateWorkspaceInvitationDto }
        >
      ) => useMutation(SEND_WORKSPACE_INVITATION, options),
    },
  },
};

export default workspaceService;
