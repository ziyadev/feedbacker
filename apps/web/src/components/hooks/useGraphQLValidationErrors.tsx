import { GraphQLFormattedError } from 'graphql/error/GraphQLError';

interface OriginalError {
  message: {
    property: string;
    messages: string[];
    constraints: Record<string, string>;
  };
}
interface BadRequestError {
  fields: OriginalError;
}
export const useGraphQLValidationErrors = () => {
  const handleBadRequest = (
    errors: readonly GraphQLFormattedError[]
  ): BadRequestError[] => {
    return errors
      ?.map((error) => {
        if (error.extensions?.code === 'BAD_REQUEST') {
          return {
            fields: {
              message: (error.extensions?.originalError as OriginalError)
                ?.message,
              property: '',
              messages: [],
              constraints: {},
            },
          };
        }
      })
      .filter((e) => !!e);
  };

  return {
    handleBadRequest,
  };
};
