import workspaceService from './workspace';

export const createClient = () => {
  return {
    workspace: workspaceService,
  };
};

export const client = createClient();
