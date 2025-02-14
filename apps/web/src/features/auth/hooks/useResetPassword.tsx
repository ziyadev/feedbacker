// features/auth/hooks/useResetPassword.ts
import { ApolloError, useMutation } from '@apollo/client';
import {
  handleApolloError,
  handleGenericError,
} from '../../../lib/error/handleError';
import { useToast } from '@/components/hooks';
import { SEND_RESET_PASSWORD_LINK } from '../api/mutations';

export const useResetPassword = () => {
  const [mutate, { loading }] = useMutation(SEND_RESET_PASSWORD_LINK);
  const { toast } = useToast();

  const sendResetEmail = async (email: string) => {
    try {
      const { data } = await mutate({ variables: { input: { email } } });
      if (data?.sendResetPasswordLink) {
        return true;
      }
      toast({
        title: 'Error sending reset password link',
        description: 'Something went wrong, please try again later',
        variant: 'error',
        duration: 7000,
      });
      return false;
    } catch (error) {
      if (error instanceof ApolloError) {
        handleApolloError(error);
      } else {
        handleGenericError();
      }
      return false;
    }
  };

  return { sendResetEmail, isLoading: loading };
};
