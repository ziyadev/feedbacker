import { ApolloError, useMutation } from "@apollo/client";
import { CREDENTIALS_SIGN_UP } from "../api/mutations";

export const useSignup = ({
      onError,
      onSuccess,
}: {
      onSuccess?: () => void;
      onError?: (e: ApolloError) => void;
}) => {

      return useMutation(CREDENTIALS_SIGN_UP, {
            onCompleted: () => {
                  onSuccess?.()
            },
            onError: (e) => {
                  onError?.(e)
            },
      })
};