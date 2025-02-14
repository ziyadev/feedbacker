import { gql } from '@/graphql/gql';

export const CREATE_WORKSPACE = gql(`
  mutation CreateWorkspace($input: CreateWorkspaceDto!) {
      createWorkspace(input: $input) {
          workspace {
              id
              name
              slug
              description
              avatar
              createdAt
              updatedAt
          }
          errors {
              code
              message
          }
      }
  }
  `);

export const IS_WORKSPACE_SLUG_VALID = gql(`
  mutation IsWorkspaceSlugValid($input: IsWorkspaceSlugValidDto!) {
      isWorkspaceSlugValid(input: $input)
  }
`);

export const SEND_WORKSPACE_INVITATION = gql(`
  mutation SendWorkspaceInvitation($input: CreateWorkspaceInvitationDto!) {
      sendWorkspaceInvitation(input: $input) {
          invitation {
              id
              workspaceId
              email
              role
              status
              createdAt
              updatedAt
          }
          errors {
              code
              message
          }
      }
  }
`);
