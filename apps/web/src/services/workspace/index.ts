import {
  CREATE_WORKSPACE,
  IS_WORKSPACE_SLUG_VALID,
} from '@/features/workspace/api/mutations';
import {
  CreateWorkspaceDto,
  CreateWorkspaceMutation,
  IsWorkspaceSlugValidDto,
  IsWorkspaceSlugValidMutation,
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
};

export default workspaceService;
