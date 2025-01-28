import { useToast } from "@/components/hooks";
import { env } from "@/env.mjs";
import useSWRMutation from "swr/mutation";
import { logout } from "../api/log-out";

export const useLogout = () => {
      const { toast } = useToast();
      return useSWRMutation(`${env.NEXT_PUBLIC_API_URL}/auth/sign-out`, logout, {
            onSuccess: () => (window.location.href = "/auth/sign-in"),
            onError: () => {
                  toast({
                        title: "Error",
                        description: "Something went wrong",
                        variant: "destructive",
                  });
            },
      });
};