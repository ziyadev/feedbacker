import { useToast } from "@/components/hooks";
import { env } from "@/env.mjs";
import useSWRMutation from "swr/mutation";
import { logout } from "../api/log-out";

export const useLogout = ({
      onSuccess,
      onError,
}: {
      onSuccess?: () => void;
      onError?: () => void;
}) => {
      const { toast } = useToast();
      return useSWRMutation(`${env.NEXT_PUBLIC_API_URL}/auth/sign-out`, logout, {
            onSuccess: () => {
                  window.location.href = "/auth/sign-in"
                  onSuccess?.()
            },
            onError: () => {
                  {
                        toast({
                              title: "Error",
                              description: "Something went wrong",
                              variant: "destructive",
                        });
                        onError?.()
                  }
            },
      });
};