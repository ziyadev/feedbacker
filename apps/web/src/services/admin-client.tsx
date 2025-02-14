import feedbackService from './feedback';
import workspaceService from './workspace';

export const createClient = () => {
  return {
    workspace: workspaceService,
    feedback: feedbackService,
  };
};

export const client = createClient();
