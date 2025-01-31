import { useToast } from '@/components/hooks';
import { ApolloError } from '@apollo/client';

export const handleApolloError = (error: ApolloError) => {
  const { toast } = useToast();
  if (error.networkError) {
    toast({
      title: 'Network Error',
      description: 'Please check your internet connection',
      variant: 'error',
      duration: 7000,
    });
    return;
  }

  const [firstError] = error.graphQLErrors;
  if (firstError) {
    showErrorToast(
      firstError.extensions?.code?.toString() || 'Error',
      firstError.message
    );
  }
};

export const handleGenericError = () => {
  showErrorToast('Unknown error occurred');
};
