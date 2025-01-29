import { ApolloError, useMutation } from "@apollo/client";
import { CREDENTIALS_LOGIN } from "../api/mutations";

export const useLogin = ({
      onError,
      onSuccess,
}: {
      onSuccess?: () => void;
      onError?: (e: ApolloError) => void;
}) => {


      return useMutation(CREDENTIALS_LOGIN, {
            onCompleted: () => {
                  onSuccess?.()
            },
            onError: (e) => {
                  onError?.(e)
            },
      })
};