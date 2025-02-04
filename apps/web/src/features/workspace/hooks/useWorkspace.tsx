import { useQuery } from '@apollo/client';
import { GET_CURRENT_WORKSPACE } from '../api/queries';

export const useWorkspace = () => {
  const { data, ...rest } = useQuery(GET_CURRENT_WORKSPACE);
  const workspace = data?.workspace || null;
  return { workspace, ...rest };
};
